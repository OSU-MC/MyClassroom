const { Router } = require('express')
const router = Router()

const db = require('../models/index')
const { logger } = require('../../lib/logger')
const sectionService = require('../services/section_service')
const { requireAuthentication, generateOTP } = require('../../lib/auth')
const { ValidationError, UniqueConstraintError } = require('sequelize')

router.post('/:course_id/sections', requireAuthentication, async function (req, res) {
    const user = await db.User.findByPk(req.payload.sub) // find user by ID, which is stored in sub
    // make sure the user creating this section is the teacher for the course
    const enrollment = await db.Enrollment.findOne({
        where: { 
            userId: user.id,
            courseId: parseInt(req.params['course_id']),
            role: 'teacher'
        }
    })

    if (req.body.number && enrollment) {
        const sectionToInsert = {
            courseId: parseInt(req.params['course_id']),
            number: req.body.number
        }
        try {
            const section = await db.Section.create(sectionToInsert)
            res.status(201).send({
                section: sectionService.extractSectionFields(section)
            })
        } catch (e) {
            if (e instanceof ValidationError) {
                // this will happen if a randomly generated join code is not unique
                next(e)
            }
            else if (e instanceof UniqueConstraintError) {
                res.status(400).send({
                    error: "A section for this course with this section number already exists"
                })
            }
            else {
                logger.error(e)
                res.status(500).send({error: "An unexpected error occured. Please try again"})
            }
        }
    } else {
        if (enrollment) {
            res.status(400).send({error: `Request did not contain required fields to create a section`})
        }
        else if (req.body.number) {
            res.status(403).send({error: `Only the teacher for a course can create a section`})
        }
        else {
            res.status(403).send({error: `Request did not contain required fields to create a section and user does not have credentials to do so anyways`})
        }
    }
})

module.exports = router