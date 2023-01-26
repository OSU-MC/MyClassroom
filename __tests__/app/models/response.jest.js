const db = require('../../../app/models/index')

describe("Response model", () => {

    describe("Response.create", () => {
        it ("should create a valid response", async() => {
            let resp = await db.Response.create({
                score: 0.96,
                submission: {
                    0: true,
                    1: true,
                    2: false,
                    3: false
                }
            })
            resp = await resp.reload()
            expect(resp.score).toEqual(0.96)
            expect(resp.submission['0']).toEqual(true)
            expect(resp.submission['1']).toEqual(true)
            expect(resp.submission['2']).toEqual(false)
            expect(resp.submission['3']).toEqual(false)
        })

        it ("should default to an empty submission", async() => {
            let resp = await db.Response.create({
                score: 0.96,
            })
            resp = await resp.reload()
            expect(resp.score).toEqual(0.96)
            expect(resp.submission).toEqual({})
        })

        it ("should invalidate because score is too high", async () => {
            await expect(db.Response.create({
                score: 1.01,
                submission: {
                    0: true,
                    1: true,
                    2: false,
                    3: false
                }
            })).rejects.toThrow("Validation error: score cannot be more than 1")
        })

        it ("should invalidate because score is too low", async () => {
            await expect(db.Response.create({
                score: -0.25,
                submission: {
                    0: true,
                    1: true,
                    2: false,
                    3: false
                }
            })).rejects.toThrow("Validation error: score cannot be less than 0")
        })

        it ("should invalidate because score is nothing", async () => {
            await expect(db.Response.create({
                submission: {
                    0: true,
                    1: true,
                    2: false,
                    3: false
                }
            })).rejects.toThrow("notNull Violation: a response must have a score")
        })
    })

    afterAll(async() => {
        await db.Response.destroy({ // delete all Response records to flush out the database after the tests have run
            where: {},
            truncate: true
        })
    })

})