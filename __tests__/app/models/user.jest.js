const db = require('../../../app/models/index')

describe("User model", () => {

    let user //declare user so it can be accessed in all the following tests, where necessary

    beforeAll(async() => {
        await db.sequelize.sync() // connect to the database
    })

    describe("User.create", () => {
        it ("should create a valid user record with default values", async () => {
            const user = await db.User.create({
                firstName: 'Dan',
                lastName: 'Smith',
                email: 'danSmith@myclassroom.com',
                rawPassword: 'Danny-o123!'
            })
            expect(user.firstName).toEqual("Dan")
            expect(user.lastName).toEqual("Smith")
            expect(user.fullName).toEqual("Dan Smith")
            expect(user.email).toEqual("danSmith@myclassroom.com")
            expect(user.rawPassword).toEqual("Danny-o123!")
            expect(user.password).not.toEqual("Danny-o123!")
            expect(user.admin).toBeFalsy()
            expect(user.failedLoginAttempts).toEqual(0)
            expect(user.lastLogin).toBeFalsy()
            expect(user.emailConfirmed).toBeFalsy()
        })
    
        it ("should reject a null firstName", async () => {
            await expect(db.User.create({
                lastName: 'Smith',
                email: 'dannySmith@myclassroom.com',
                rawPassword: 'Danny-o123!',
            })).rejects.toThrow("notNull Violation: First name required")
        })
    
        it ("should reject an empty firstName", async () => {
            await expect(db.User.create({
                firstName: '',
                lastName: 'Smith',
                email: 'dannySmith@myclassroom.com',
                rawPassword: 'Danny-o123!',
            })).rejects.toThrow("Validation error: First name cannot be empty")
        })
    
        it ("should reject a null lastName", async () => {
            await expect(db.User.create({
                firstName: 'Dan',
                email: 'dannySmith@myclassroom.com',
                rawPassword: 'Danny-o123!',
            })).rejects.toThrow("notNull Violation: Last name required")
        })
    
        it ("should reject an empty lastName", async () => {
            await expect(db.User.create({
                firstName: 'Dan',
                lastName: '',
                email: 'dannySmith@myclassroom.com',
                rawPassword: 'Danny-o123!',
            })).rejects.toThrow("Validation error: Last name cannot be empty")
        })
    
        it ("should reject a non-unique email", async () => {
            await expect(db.User.create({
                firstName: 'Dan',
                lastName: 'Smith',
                email: 'danSmith@myclassroom.com',
                rawPassword: 'Danny-o123!',
            })).rejects.toThrow("Validation error")
        })
    
        it ("should reject a invalid email address", async () => {
            await expect(db.User.create({
                firstName: 'Dan',
                lastName: 'Smith',
                email: 'danSmith.com',
                rawPassword: 'Danny-o123!',
            })).rejects.toThrow("Validation error: Invalid email")
        })
    
        it ("should reject a null rawPassword", async () => {
            await expect(db.User.create({
                firstName: 'Dan',
                lastName: 'Smith',
                email: 'dannySmith@myclassroom.com'
            })).rejects.toThrow("notNull Violation: Password cannot be null")
        })

        it ("should reject a rawPassword that is too short", async () => {
            await expect(db.User.create({
                firstName: 'Dan',
                lastName: 'Smith',
                email: 'dannySmith@myclassroom.com',
                rawPassword: 'Danny-o!'
            })).rejects.toThrow("Validation error: Password must be 11-32 characters")
        })

        it ("should reject a rawPassword that is too long", async () => {
            await expect(db.User.create({
                firstName: 'Dan',
                lastName: 'Smith',
                email: 'dannySmith@myclassroom.com',
                rawPassword: 'Danny-o!Danny-o!Danny-o!Danny-o!!'
            })).rejects.toThrow("Validation error: Password must be 11-32 characters")
        })
    })

    describe("User.update", () => {

        beforeEach(async() => {
            user = await db.User.create({
                firstName: 'Dan',
                lastName: 'Smith',
                email: 'dannySmith@myclassroom.com',
                rawPassword: 'Danny-o123!'
            })
        })

        it ("should update the name", async () => {
            await user.update({firstName: "Danny"})
            await expect(user.save()).resolves.toBeTruthy()
            await user.reload() // reloads the instance from the database after the update into the user variables
            expect(user.firstName).toEqual("Danny")
        })

        it ("should update the email", async () => {
            await user.update({email: "danSmithy@myclassroom.com"})
            await expect(user.save()).resolves.toBeTruthy()
            await user.reload() 
            expect(user.email).toEqual("danSmithy@myclassroom.com")
        })

        it ("should update the password", async () => {
            const password = user.password
            await user.update({rawPassword: "Danny-o1234!"})
            await expect(user.save()).resolves.toBeTruthy()
            await user.reload() // the reload will clear rawPassword because it is virtual and not stored in the database
            expect(user.password).not.toEqual(password)
            expect(user.password).not.toEqual(user.rawPassword)
        })

        it ("should reject an email update with an existing email", async () => {
            await expect(user.update({email: "danSmith@myclassroom.com"})).rejects.toThrow("Validation error")
            await user.reload() 
            expect(user.email).toEqual("dannySmith@myclassroom.com")
        })

        afterEach(async () => {
            await user.destroy()
        })
    })

    describe("validatePassword", () => {
        beforeAll(async () => {
            user = await db.User.create({
                firstName: 'Dan',
                lastName: 'Smith',
                email: 'dannySmith@myclassroom.com',
                rawPassword: 'Danny-o123!'
            })
        })

        it ("should validate that the password is correct", () => {
            expect(user.validatePassword("Danny-o123!")).toEqual(true)
        })

        it ("should validate that the password is incorrect", () => {
            expect(user.validatePassword("Danny-o1234!")).toEqual(false)
        })

        afterAll(async () => {
            await user.destroy()
        })
    })
    

    afterAll(async () => {
        await db.User.destroy({ // delete all User records to flush out the database after the tests have run
            where: {},
            truncate: true
        })
        await db.sequelize.close()
    })
})