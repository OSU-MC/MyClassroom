const { Router } = require('express')
const router = Router()
const db = require('../models/index')


//GET request from /courses homepage
router.get('/', async function (req, res) {
    // TODO: use the authentication token (bearer) to authenticate & find the user
    const user = await db.User.findOne({ // replace this with a find to get the user by id (available after authentication)
        where: { email: 'memer@myclassroom.com' }
    })

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
                include: [
                    {
                        model: db.Enrollment,
                        where: { role: 'student', userId: user.id },
                    }
                ]
            }
        ]
    })
    // if (teacherCourses == [] && studentCourses == []) {
    //     res.status(204).send()
    // }
    res.status(200).json({
        "studentCourses": studentCourses,
        "teacherCourses": teacherCourses
    })
})

router.use('/:course_id/lectures', require('./lectures'))

module.exports = router