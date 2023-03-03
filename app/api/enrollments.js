const router = require('express').Router({ mergeParams: true })
const db = require('../models/index')
const courseService = require('../services/course_service')
const enrollmentService = require('../services/enrollment_service')
const sectionService = require('../services/section_service')
const { requireAuthentication } = require('../../lib/auth')
const string_helpers = require('../../lib/string_helpers')
const { logger } = require('../../lib/logger')

// GET /courses/:course_id/enrollments
// endpoint handles teacher getting a roster for a given course
router.get('/', requireAuthentication, async function (req, res) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    const courseId = parseInt(req.params['course_id'])
    // we want to list the roster only if the user for the course is a teacher
    const enrollmentTeacher = await db.Enrollment.findOne({
        where: { 
            userId: user.id,
            courseId: courseId,
            role: 'teacher'
        }
    })

    if (enrollmentTeacher) {
        const enrollments = await db.Enrollment.findAll({
            include: [
                {
                    model: db.Section,
                    where: {
                        courseId: courseId
                    }
                    
                }
            ]
            
        })
        res.status(200).send({
            enrollments: enrollmentService.extractArrayEnrollmentFields(enrollments)
        })
    } else {
        res.status(403).send({error: `Only the teacher for a course can view the roster`})
    }
})

// deletes a student from the course roster
router.delete('/:enrollment_id', requireAuthentication, async function (req, res) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    const courseId = parseInt(req.params['course_id'])
    const enrollmentId = parseInt(req.params['enrollment_id'])

    // we want to delete an enrollment only if the user for the course is a teacher
    const enrollmentTeacher = await db.Enrollment.findOne({
        where: { 
            userId: user.id,
            courseId: courseId,
            role: 'teacher'
        }
    })

    if (enrollmentTeacher) {
        const enrollment = await db.Enrollment.findByPk(enrollmentId)
        try {
            await enrollment.destroy()
            res.status(204).send()
        } catch {
            next(e)
        }
    } else {
        res.status(403).send({error: `Only the teacher for a course can delete a student from the roster`})
    }
})

// changes the section of a student
router.put('/:enrollment_id', requireAuthentication, async function (req, res) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    const courseId = parseInt(req.params['course_id'])
    const enrollmentId = parseInt(req.params['enrollment_id'])

    // we want to list the roster only if the user for the course is a teacher
    const enrollmentTeacher = await db.Enrollment.findOne({
        where: { 
            userId: user.id,
            courseId: courseId,
            role: 'teacher'
        }
    })

    if (enrollmentTeacher) {
        if (req.body.sectionId) { // the section to change to
            // make sure the section being updated to exists and is part of the correct course
            const sectionToUpdateTo = await db.Section.findOne({
                where: {
                    courseId: courseId,
                    id: req.body.sectionId
                }
            })
            if (sectionToUpdateTo) {
                const enrollment = await db.Enrollment.findByPk(enrollmentId)
                try {
                    await enrollment.update({
                        sectionId: req.body.sectionId
                    })
                    res.status(200).send({
                        enrollment: enrollmentService.extractEnrollmentFields(enrollment)
                    })
                } catch (e) {
                    // next(e) // catch anything weird that happens
                    logger.error(e)
                    res.status(500).send({error: "msg"})
                }
            } else {
                res.status(400).send({error: 'Section number to update to does not exist'})
            }
        } else {
            res.status(400).send({error: 'Request must contain a "number" field to update section number to'})
        }
        
    } else {
        res.status(403).send({error: `Only the teacher for a course can change a student's section`})
    }
})

module.exports = router