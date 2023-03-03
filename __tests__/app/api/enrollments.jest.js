const app = require('../../../app/app')
const db = require('../../../app/models')
const jwtUtils = require('../../../lib/jwt_utils')
const { generateUserSession } = require('../../../lib/auth')
const request = require('supertest')

describe('/courses endpoints', () => {

    let user
    let user2
    let user3
    let course
    let section
    let section2
    let enrollment
    let enrollment2
    let enrollment3
    let userXsrfCookie
    let userCookies
    let user2XsrfCookie
    let user2Cookies
    let user3XsrfCookie
    let user3Cookies

    beforeAll(async() => {

        user = await db.User.create({
            firstName: 'Dan',
            lastName: 'Smith',
            email: 'dannySmith@myclassroom.com',
            rawPassword: 'Danny-o123!'
        })
        userToken = jwtUtils.encode({
            sub: user.id
        })
        const userSession = await generateUserSession(user)
        userXsrfCookie = userSession.csrfToken
        userCookies = [`_myclassroom_session=${userToken}`]
        

        user2 = await db.User.create({
            firstName: 'Mitchell',
            lastName: 'DaGoat',
            email: 'mitchdagoat@myclassroom.com',
            rawPassword: 'mitchell123!!'
        })
        user2Token = jwtUtils.encode({
            sub: user2.id
        })
        const user2Session = await generateUserSession(user2)
        user2XsrfCookie = user2Session.csrfToken
        user2Cookies = [`_myclassroom_session=${user2Token}`]

        user3 = await db.User.create({
            firstName: 'TheUser',
            lastName: 'ItsMe',
            email: 'theuser@myclassroom.com',
            rawPassword: 'Imtheuseryesthatsme'
        })
        user3Token = jwtUtils.encode({
            sub: user3.id
        })
        const user3Session = await generateUserSession(user3)
        user3XsrfCookie = user3Session.csrfToken
        user3Cookies = [`_myclassroom_session=${user3Token}`]

        course = await db.Course.create({
            name: 'Testing Things 101',
            description: 'This will be a course about testing things, most notably in jest',
            published: false
        })

        section = await db.Section.create({
            courseId: course.id,
            number: 1
        })

        section2 = await db.Section.create({
            courseId: course.id,
            number: 2
        })

        enrollment = await db.Enrollment.create({
            role: 'teacher',
            courseId: course.id,
            userId: user.id
        })

        enrollment2 = await db.Enrollment.create({
            role: 'student',
            sectionId: section.id,
            userId: user2.id
        })

        enrollment3 = await db.Enrollment.create({
            role: 'student',
            sectionId: section2.id,
            userId: user3.id
        })

    })

    it('should respond with 200 when a teacher gets their roster', async () => {
        const resp = await request(app).get(`/courses/${course.id}/enrollments`).set('Cookie', userCookies).set('X-XSRF-TOKEN', userXsrfCookie)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body.enrollments.length).toEqual(2)
        expect(resp.body.enrollments[0].userId).toEqual(user2.id)
        expect(resp.body.enrollments[0].role).toEqual('student')
        expect(resp.body.enrollments[0].sectionId).toEqual(section.id)
        expect(resp.body.enrollments[1].userId).toEqual(user3.id)
        expect(resp.body.enrollments[1].role).toEqual('student')
        expect(resp.body.enrollments[1].sectionId).toEqual(section2.id)
    })

    it('should respond with 403 when a student tries to get the roster', async () => { 
        const resp = await request(app).get(`/courses/${course.id}/enrollments`).set('Cookie', user2Cookies).set('X-XSRF-TOKEN', user2XsrfCookie)
        expect(resp.statusCode).toEqual(403)
    })

    it('should respond with 200 when a teacher changes a student section', async () => {
        const resp = await request(app).put(`/courses/${course.id}/enrollments/${enrollment3.id}`).send({
            sectionId: section.id
        }).set('Cookie', userCookies).set('X-XSRF-TOKEN', userXsrfCookie)
        expect(resp.statusCode).toEqual(200)
        expect(resp.body.enrollment.userId).toEqual(user3.id)
        expect(resp.body.enrollment.role).toEqual('student')
        expect(resp.body.enrollment.sectionId).toEqual(section.id)
    })

    it('should respond with 403 when a student tries to change section', async () => {
        const resp = await request(app).put(`/courses/${course.id}/enrollments/${enrollment3.id}`).send({
            sectionId: section2.id
        }).set('Cookie', user3Cookies).set('X-XSRF-TOKEN', user3XsrfCookie)
        expect(resp.statusCode).toEqual(403)
    })

    it('should respond with 400 when a request does not contain a section number to switch to', async () => {
        const resp = await request(app).put(`/courses/${course.id}/enrollments/${enrollment3.id}`).send({
        }).set('Cookie', userCookies).set('X-XSRF-TOKEN', userXsrfCookie)
        expect(resp.statusCode).toEqual(400)
    })

    it('should respond with 400 when the section number to switch to does not exist', async () => {
        const resp = await request(app).put(`/courses/${course.id}/enrollments/${enrollment3.id}`).send({
            sectionId: 100000
        }).set('Cookie', userCookies).set('X-XSRF-TOKEN', userXsrfCookie)
        expect(resp.statusCode).toEqual(400)
    })

    it('should respond with 204 when deleting an enrollment', async () => {
        const resp = await request(app).delete(`/courses/${course.id}/enrollments/${enrollment3.id}`).set('Cookie', userCookies).set('X-XSRF-TOKEN', userXsrfCookie)
        expect(resp.statusCode).toEqual(204)

        const respEnrollments = await request(app).get(`/courses/${course.id}/enrollments`).set('Cookie', userCookies).set('X-XSRF-TOKEN', userXsrfCookie)
        expect(respEnrollments.statusCode).toEqual(200)
        expect(respEnrollments.body.enrollments.length).toEqual(1)
        expect(respEnrollments.body.enrollments[0].userId).toEqual(user2.id)
        expect(respEnrollments.body.enrollments[0].role).toEqual('student')
        expect(respEnrollments.body.enrollments[0].sectionId).toEqual(section.id)
    })

    it('should respond with 403 when a student tries deleting an enrollment', async () => {
        const resp = await request(app).delete(`/courses/${course.id}/enrollments/${enrollment3.id}`).set('Cookie', user2Cookies).set('X-XSRF-TOKEN', user2XsrfCookie)
        expect(resp.statusCode).toEqual(403)
    })
    

    afterAll(async () => {
        await user.destroy()
        await user2.destroy()
        await user3.destroy()
        await course.destroy() // should cascade on delete and delete sections and enrollments as well
    })
})