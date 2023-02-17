const db = require('../../../app/models')
const usersService = require('../../../app/services/users_service')

describe('Users Service', () => {

    let completeCreationFields = {
        firstName: "Memer",
        lastName: "Magic",
        email: "memer@myclassroom.com",
        rawPassword: "Iamsuchamemer!"
    }

    let incompleteRequestBody = completeCreationFields

    let missingRequestFields = {
        confirmedPassword: "Iamsuchamemer!"
    }

    describe('validateUserCreationRequest', () => {
        it('should return an empty array when all required fields are present', () => {
            expect(usersService.validateUserCreationRequest({...incompleteRequestBody, ...missingRequestFields}).length).toEqual(0)
        })

        it ('should return an array with the missingRequestFields keys', () => {
            const missingFields = usersService.validateUserCreationRequest(incompleteRequestBody)
            const missingRequestFieldsKeys = Object.keys(missingRequestFields)
            expect(missingFields.length).toEqual(missingRequestFieldsKeys.length)
            expect(missingFields).toEqual(missingRequestFieldsKeys)
        })
    })
    
    describe('extractUserCreationFields', () => {
        it('should extract only the needed parameters to create a user', () => {
            const extractedFields = usersService.extractUserCreationFields({...completeCreationFields, ...missingRequestFields})
            expect(Object.keys(extractedFields).length).toEqual(Object.keys(completeCreationFields).length)
            expect(extractedFields).toEqual(completeCreationFields)
        })
    })

    describe('filterUserFields', () => {

        let user

        beforeEach(async () => {
            user = await db.User.create(completeCreationFields)
        })

        it ('should return the firstName, lastName, and email of the user', () => {
            expect(usersService.filterUserFields(user)).toEqual({
                id: user.id,
                firstName: "Memer",
                lastName: "Magic",
                email: "memer@myclassroom.com"
            })
        })

        afterEach(async () => {
            await user.destroy()
        })
    })
})