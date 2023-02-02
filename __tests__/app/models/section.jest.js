const course = require('../../../app/models/course')
const db = require('../../../app/models/index')

describe("Section model", () => {

    let course

    beforeAll(async () => {
        course = await db.Course.create({
            name: 'PH211: Introduction to Physics',
            description: 'An introduction to physics concepts, such as kinematics, Newton\'s Laws, and more.'
        })
    })

    describe("Section.create", () => {
        it ("should create a valid section record with default values", async () => {
            const section = await db.Section.create({
                number: 1,
                joinCode: "23XyZ7", // some alphanumeric value
                courseId: course.id
            })
            expect(section.number).toEqual(1)
            expect(section.joinCode).toEqual("23XyZ7")
            expect(section.courseId).toEqual(course.id)
            await section.destroy()
        })

        it ("should reject a section with repeated section number in the same course", async () => {
            const section = await db.Section.create({
                number: 15,
                joinCode: "34Rt56",
                courseId: course.id
            })
            await expect(db.Section.create({
                number: 15,
                joinCode: "34Rt57",
                courseId: course.id
            })).rejects.toThrow("Validation error")
            await section.destroy()
        })

        it ("should reject a section with repeated join code", async () => {
            const section = await db.Section.create({
                number: 3,
                joinCode: "23Xyp7",
                courseId: course.id
            })
            await expect(db.Section.create({
                number: 4,
                joinCode: "23Xyp7",
                courseId: course.id
            })).rejects.toThrow("Validation error")
            await section.destroy()
        })
    
        it ("should reject a null section number", async () => {
            await expect(db.Section.create({
                joinCode: "23gyZ9",
                courseId: course.id
            })).rejects.toThrow("notNull Violation: Section.number cannot be null")
        })

        it ("should reject a null section join code", async () => {
            await expect(db.Section.create({
                number: 5,
                courseId: course.id
            })).rejects.toThrow("notNull Violation: Section join code required")
        })

        it ("should reject a section with a non alphanumeric join code", async () => {
            await expect(db.Section.create({
                number: 6,
                joinCode: "3#$,.5",
                courseId: course.id
            })).rejects.toThrow("Validation error: Validation isAlphanumeric on joinCode failed")
        })

        it ("should reject a section with a join code shorter than 6 characters", async () => {
            await expect(db.Section.create({
                number: 7,
                joinCode: "XSXS",
                courseId: course.id
            })).rejects.toThrow("Validation error: Section join code must be 6 characters")
        })

        it ("should reject a section with a join code longer than 6 characters", async () => {
            await expect(db.Section.create({
                number: 8,
                joinCode: "XSXSXSXS",
                courseId: course.id
            })).rejects.toThrow("Validation error: Section join code must be 6 characters")
        })

        it ("should reject a section without a courseId", async () => {
            await expect(db.Section.create({
                number: 9,
                joinCode: "CADFEW"
            })).rejects.toThrow("notNull Violation: A section must belong to a course")
        })
    
    })

    describe("Section.update", () => {

        let section

        beforeEach(async() => {
            section = await db.Section.create({
                number: 20,
                joinCode: "RT1YU3",
                courseId: course.id
            })
        })

        it ("should update the section number", async () => {
            await section.update({number: 25})
            await expect(section.save()).resolves.toBeTruthy()
            await section.reload() // reloads the instance from the database after the update into the section variables
            expect(section.number).toEqual(25)
        })

        it ("should update the section join code", async () => {
            await section.update({joinCode: "5TY7UI"})
            await expect(section.save()).resolves.toBeTruthy()
            await section.reload() // reloads the instance from the database after the update into the section variables
            expect(section.joinCode).toEqual("5TY7UI")
        })

        afterEach(async () => {
            await section.destroy()
        })
    })

    afterAll(async () => {
        await course.destroy()
    })
})