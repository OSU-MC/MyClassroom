const { Router } = require('express')
const router = Router()
const db = require('../models/index')
const courseService = require('../services/course_service')
const enrollmentService = require('../services/enrollment_service')
const sectionService = require('../services/section_service')
const { requireAuthentication } = require('../../lib/auth')
const string_helpers = require('../../lib/string_helpers')
const { UniqueConstraintError } = require('sequelize')

// GET request from /courses homepage
router.get('/', requireAuthentication, async function (req, res) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    const teacherCourses = await db.Course.findAll({
        include: [{
            model: db.Enrollment,
            where: { role: 'teacher', userId: user.id }
        }]
    })
    const studentCourses = await db.Course.findAll({
        include: [
            {
                model: db.Section,
                required: true,
                include: [
                    {
                        model: db.Enrollment,
                        required: true,
                        where: { role: 'student', userId: user.id },
                        attributes: ['sectionId'],
                    }
                ]
            }
        ]
    })

    res.status(200).send({
        studentCourses : courseService.extractArrayStudentCourseFields(studentCourses),
        teacherCourses : courseService.extractArrayCourseFields(teacherCourses)
    })

})

//User Creates a course
//Authenticate token, create course & create enrollment for logged in user as teacher in the course
router.post('/', requireAuthentication, async function (req, res) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub

    // create course & role as a teacher in enrollment
    // create course 
    if (req.body.name) { // name is required, other fields can be left unspecified
        // create course with valid fields
        try {
            const course = await db.Course.create(courseService.extractCourseFields(req.body))
        
            //create the enrollment
            const enrollmentToInsert = {
                courseId: course.id,
                userId: user.id,
                role: 'teacher'
                // no section because they are a teacher
            }
            const enrollment = await db.Enrollment.create(enrollmentToInsert)
            res.status(201).send({
                course: courseService.extractCourseFields(course),
                enrollment: enrollmentService.extractEnrollmentFields(enrollment)
            })
        } catch (e) {
            if (e instanceof ValidationError) {
                res.status(400).send({
                    error: string_helpers.serializeSequelizeErrors(e)
                })
            } else {
                next(e)
            }
        }
        
    } else {
        res.status(400).send({error: "A course requires a name"})
    }

})

//User joins with course code
//Authenticate token & create enrollment for the user in the section that has a code 
router.post('/join', requireAuthentication, async function (req, res, next) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub

    const joinCode = req.body.joinCode
    if (joinCode) {

        const section = await db.Section.findOne({
            where: { joinCode: joinCode }
        })

        if (section) {
            // create the enrollment
            const enrollmentToInsert = {
                sectionId: section.id,
                userId: user.id,
                role: 'student'
                // no course because they are a student
            }

            try {
                const enrollment = await db.Enrollment.create(enrollmentToInsert)
                const course = await db.Course.findByPk(section.courseId)
                res.status(201).send({
                    section: sectionService.extractSectionFields(section),
                    course: course,
                    enrollment: enrollmentService.extractEnrollmentFields(enrollment)
                })
            }
            catch (e) {
                if (e instanceof UniqueConstraintError) {
                    res.status(400).send({
                        error: "User is already enrolled in this course"
                    })
                }
                else {
                    next(e)
                }
            }
        } else {
            res.status(404).send({error: `No section exists with the provided join code`})
        }
    } else {
        res.status(400).send({error: `Request did not contain a join code`})
    }
})

router.put('/:course_id', requireAuthentication, async function (req, res) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    const courseId = parseInt(req.params['course_id'])

    // we want to update a course only if the user for the course is a teacher
    const enrollment = await db.Enrollment.findOne({
        where: { 
            userId: user.id,
            courseId: courseId,
            role: 'teacher'
        }
    })

    if (enrollment) {
        // just need one of the following in the request to update
        if (req.body.name || req.body.description || req.body.published) {
            const course = await db.Course.findByPk(courseId)
            const updatedCourse = courseService.extractCourseUpdateFields(req.body)
            try {
                await course.update(updatedCourse)
                res.status(200).send({
                    course: courseService.extractCourseFields(course)
                })
            } catch (e) {
                if (e instanceof ValidationError) {
                    res.status(400).send({
                        error: string_helpers.serializeSequelizeErrors(e)
                    })
                } else {
                    next(e)
                }
            }
        } else {
            res.status(400).send({error: "Request must contain either name, description, or published status"})
        }
    } else {
        res.status(403).send({error: `Only the teacher for a course can edit the course`})
    }
})

router.delete('/:course_id', requireAuthentication, async function (req, res) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    const courseId = parseInt(req.params['course_id'])

    // we want to update a course only if the user for the course is a teacher
    // **NOTE: might be valuable at some point to just create a function that checks if a user is a teacher?
    const enrollment = await db.Enrollment.findOne({
        where: { 
            userId: user.id,
            courseId: courseId,
            role: 'teacher'
        }
    })

    if (enrollment) {
        const course = await db.Course.findByPk(courseId)
        try {
            await course.destroy()
            res.status(204).send()
        } catch {
            next(e)
        }
    } else {
        res.status(403).send({error: `Only the teacher for a course can delete the course`})
    }
})

router.use('/:course_id/lectures', require('./lectures'))
router.use('/:course_id/enrollments', require('./enrollments'))
router.use('/:course_id/questions', require('./questions'))
router.use('/:course_id/sections', require('./sections'))

module.exports = router