const app = require('../../../app/app')
const request = require('supertest')

describe('POST /users', () => {
    it('should respond with 201 and user information', async () => {
        const resp = await request(app).post('/users').send({
            firstName: "Memey",
            lastName: "Meme",
            email: "MemeyMeme@myclassroom.com",
            rawPassword: "TheMemeiestSecret",
            confirmedPassword: "TheMemeiestSecret"
        })
        expect(resp.statusCode).toEqual(201)
        expect(resp.body.user.firstName).toEqual("Memey")
        expect(resp.body.user.lastName).toEqual("Meme")
        expect(resp.body.user.email).toEqual("MemeyMeme@myclassroom.com")
        expect(resp.body.token).toBeTruthy()
    })

    it('should respond with 400 and missing fields', async () => {
        const resp = await request(app).post('/users').send({
            firstName: "Memey",
            email: "MemeyMeme@myclassroom.com",
            rawPassword: "TheMemeiestSecret",
        })
        expect(resp.statusCode).toEqual(400)
        expect(resp.body.error).toEqual("Missing fields required to create user: lastName, confirmedPassword")
    })

    it('should respond with 400 and message that passwords do not match', async () => {
        const resp = await request(app).post('/users').send({
            firstName: "Memer",
            lastName: "Memey",
            email: "MemeyMemer123@myclassroom.com",
            rawPassword: "TheMemeiestSecret",
            confirmedPassword: "TheMemeiestSecret123"
        })
        expect(resp.statusCode).toEqual(400)
        expect(resp.body.error).toEqual("Password & confirmed password do not match")
    })

    it('should respond with 400 and message that email already exists', async () => {
        const resp = await request(app).post('/users').send({
            firstName: "Memer",
            lastName: "Memey",
            email: "MemeyMeme@myclassroom.com",
            rawPassword: "TheMemeiestSecret123",
            confirmedPassword: "TheMemeiestSecret123"
        })
        expect(resp.statusCode).toEqual(400)
        expect(resp.body.error).toEqual("An account associated with that email already exists")
    })

    it('should respond with 400 and validation errors', async () => {
        const resp = await request(app).post('/users').send({
            firstName: "Memer",
            lastName: "",
            email: "MemeyMemer123@myclassroom",
            rawPassword: "TheMemeiestSecret123",
            confirmedPassword: "TheMemeiestSecret123"
        })
        expect(resp.statusCode).toEqual(400)
        expect(resp.body.error).toContain("Invalid email")
        expect(resp.body.error).toContain("Last name cannot be empty")
    })
})