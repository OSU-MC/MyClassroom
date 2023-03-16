const router = require('express').Router({ mergeParams: true })
const db = require('../models')
const { generateUserAuthToken, requireAuthentication } = require('../../lib/auth')
const enrollmentService = require('../services/enrollment_service')
const lectureService = require('../services/lecture_service')
const questionService = require('../services/question_service')

// base path: /courses/:course_id/lectures/:lecture_id/questions

// teacher wants to view a question inside a lecture 
router.get('/:question_id', requireAuthentication, async function (req, res, next) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    const courseId = parseInt(req.params['course_id'])
    const lectureId = parseInt(req.params['lecture_id'])
    const questionId = parseInt(req.params['question_id'])

    try {
        //check if the user is a teacher
        const isTeacher = await enrollmentService.checkIfTeacher(user.id, courseId)
        if (isTeacher) {
            const isLecInCourse = await lectureService.getLectureInCourse(lectureId, courseId)
            if (isLecInCourse) {
                const questionInLecture = await questionService.getQuestionInLecture(questionId, lectureId)
                if (questionInLecture) {
                    const question = await questionService.getQuestionInCourse(questionId, courseId)
                    if (question) {
                        const respObj = {   // create response with question info and lecture-relationship info
                            ...questionService.extractQuestionFields(question),
                            ...questionService.extractQuestionInLectureFields(questionInLecture)
                        }
                        res.status(200).send(respObj)
                    }
                    else {  // if there's no question of this id (from this course)
                        res.status(404).send({error: "The given question ID not found in this course"})
                    }
                }
                else {  // if given question is not in this lecture
                    res.status(400).send({error: "The given question ID does not belong to this lecture"})
                }
            }
            else {  // if given lecture is not in this course
                res.status(400).send({error: "The given lecture ID does not belong to this course"})
            }
        }
        else {  // user is not a teacher
            res.status(403).send({error: "Must be a teacher of this course to get question info"})
        }
    }
    catch (e) {
        next(e)
    }
})

// teacher wants to (un)publish a question inside a lecture 
router.put('/:question_id', requireAuthentication, async function (req, res, next) {
    // SAME logic as GET, but different action upon request validation
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    const courseId = parseInt(req.params['course_id'])
    const lectureId = parseInt(req.params['lecture_id'])
    const questionId = parseInt(req.params['question_id'])

    try {
        //check if the user is a teacher
        const isTeacher = await enrollmentService.checkIfTeacher(user.id, courseId)
        if (isTeacher) {
            const isLecInCourse = await lectureService.getLectureInCourse(lectureId, courseId)
            if (isLecInCourse) {
                const questionInLecture = await questionService.getQuestionInLecture(questionId, lectureId)
                if (questionInLecture) {
                    const question = await questionService.getQuestionInCourse(questionId, courseId)
                    if (question) {
                        const updatePublishedTo = !(questionInLecture.published)    // get opposite bool of current published status
                        await questionInLecture.update({published: updatePublishedTo})
                        res.status(200).send()
                    }
                    else {  // if there's no question of this id (from this course)
                        res.status(404).send({error: "The given question ID not found in this course"})
                    }
                }
                else {  // if given question is not in this lecture
                    res.status(400).send({error: "The given question ID does not belong to this lecture"})
                }
            }
            else {  // if given lecture is not in this course
                res.status(400).send({error: "The given lecture ID does not belong to this course"})
            }
        }
        else {  // user is not a teacher
            res.status(403).send({error: "Must be a teacher of this course to get question info"})
        }
    }
    catch (e) {
        next(e)
    }
})

module.exports = router
