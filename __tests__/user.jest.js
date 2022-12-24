const db = require('../models/index')
const app = require('../app')

describe("User model", () => {
    beforeAll(async() => {
        await db.sequelize.sync()
    })

    it ("should", async () => {
        expect(0).toBe(0)
    })

    afterAll(async () => {
        await db.sequelize.close()
    })
})