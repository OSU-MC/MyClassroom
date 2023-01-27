const db = require('../../../app/models/index')
const moment = require('moment')

describe("Enrollment model", () => {

    let enrollment //declare enrollment so it can be accessed in all the following tests, where necessary

    beforeAll(async() => {
        await db.sequelize.sync() // connect to the database
    })

    describe("Enrollment.create", () => {
        it ("should create a valid enrollment record with student role", async () => {
            const enrollment = await db.Enrollment.create({
                role: "student"
            })
            expect(enrollment.role).toEqual("student")
        })

        it ("should create a valid enrollment record with teacher role", async () => {
            const enrollment = await db.Enrollment.create({
                role: "teacher"
            })
            expect(enrollment.role).toEqual("teacher")
        })

        it ("should create a valid enrollment record with ta role", async () => {
            const enrollment = await db.Enrollment.create({
                role: "ta"
            })
            expect(enrollment.role).toEqual("ta")
        })

        it ("should create a valid enrollment record with admin role", async () => {
            const enrollment = await db.Enrollment.create({
                role: "admin"
            })
            expect(enrollment.role).toEqual("admin")
        })

        it ("should reject an enrollment with a role that isn't student, teacher, ta, or admin", async () => {
            await expect(db.Enrollment.create({
                role: "ergesetb"
            })).rejects.toThrow("Validation error: Validation isIn on role failed")
        })

        it ("should reject an enrollment with no role", async () => {
            await expect(db.Enrollment.create({
            })).rejects.toThrow("notNull Violation: Enrollment role required")
        })
    
    })

    describe("Section.update", () => {

        beforeEach(async() => {
            enrollment = await db.Enrollment.create({
                role: "student"
            })
        })

        it ("should update the enrollment role", async () => {
            await enrollment.update({role: "ta"})
            await expect(enrollment.save()).resolves.toBeTruthy()
            await enrollment.reload() // reloads the instance from the database after the update into the section variables
            expect(enrollment.role).toEqual("ta")
        })

        afterEach(async () => {
            await enrollment.destroy()
        })
    })

    afterAll(async () => {
        await db.Enrollment.destroy({ // delete all Section records to flush out the database after the tests have run
            where: {},
            truncate: true
        })
        await db.sequelize.close()
    })
})