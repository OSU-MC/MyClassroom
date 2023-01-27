
const { UniqueConstraintError } = require('sequelize')
const db = require('../../../app/models/index')

describe('Lecture model', () => {
    let lecture

    beforeAll(async() => {
        await db.sequelize.sync() // connect to the database
    })

    describe('Lecture.create', () => {
        it('should create lecture with provided/default values', async () => {
            const lecture = await db.Lecture.create({
                title: 'question set 1',
                order: 1,
                description: 'intro q',
                // UNCOMMENT:
                // courseId: 1
            })
            expect(typeof lecture.id).toBe('number')
            expect(lecture.title).toEqual('question set 1')
            expect(lecture.order).toEqual(1)
            expect(lecture.description).toEqual('intro q')
            // UNCOMMENT:
            // expect(lecture.courseId).toEqual(1)
        })

        it('should reject a lecture with missing title', async () => {
            await expect(db.Lecture.create({
                order: 2,
                description: 'intro q',
                // UNCOMMENT:
                // courseId: 1
            })).rejects.toThrow('Lecture name required')
        })

        it('should reject a lecture with empty title', async () => {
            await expect(db.Lecture.create({
                title: '',
                order: 2,
                description: 'intro q',
                // UNCOMMENT:
                // courseId: 1
            })).rejects.toThrow('Validation error: Title must be between 1 and 50 characters')
        })

        it('should reject a lecture title > 50 characters', async () => {
            await expect(db.Lecture.create({
                title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',   // 51 chars
                order: 2,
                description: 'intro q',
                // UNCOMMENT:
                // courseId: 1
            })).rejects.toThrow('Validation error: Title must be between 1 and 50 characters')
        })

        it('should reject a new entry with matching order AND courseId', async () => {
            await expect(db.Lecture.create({
                title: 'new lec',
                order: 1,
                description: 'new intro q',
                // UNCOMMENT: 
                // courseId: 1
            })).rejects.toThrow(UniqueConstraintError)
        })
        // TODO: write test that checks if order gets correctly filled if not passed in
        // (should be 1 increment from current order in current course)
        // beforeCreate needs to be uncommented in lecture.js for this
    })

    describe('Lecture.update', () => {
        beforeEach(async() => {
            lecture = await db.Lecture.create({
                title: 'question set 1',
                order: 5,
                description: 'intro q',
                // UNCOMMENT:
                // courseId: 1
            })
        })

        it('should update lecture title', async () => {
            await lecture.update({title: 'set 2'})
            await expect(lecture.save()).resolves.toBeTruthy()
            await lecture.reload()
            expect(lecture.title).toEqual('set 2')
        })

        it('should update lecture order', async () => {
            await lecture.update({order: 6})
            await expect(lecture.save()).resolves.toBeTruthy()
            await lecture.reload()
            expect(lecture.order).toEqual(6)
        })

        it('should update lecture description', async () => {
            await lecture.update({description: 'new description'})
            await expect(lecture.save()).resolves.toBeTruthy()
            await lecture.reload()
            expect(lecture.description).toEqual('new description')
        })

        afterEach(async () => {
            await lecture.destroy()
        })
    })

    afterAll(async () => {
        // remove all lecture entries created during the test
        await db.Lecture.destroy({
            where: {},
            truncate: true
        })
        await db.sequelize.close()
    })
})