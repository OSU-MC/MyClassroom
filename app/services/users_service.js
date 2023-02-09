const { extractValidFields, validateAgainstSchema } = require('../../lib/validator')

const userInformationSchema = {
    firstName: { required: true },
    lastName: { required: true },
    email: { required: true },
}

const userCreationSchema = {
    ...userInformationSchema,
    rawPassword: { required: true },
}

const userCreationRequestSchema = {
    ...userCreationSchema,
    confirmedPassword: { required: true }
}

exports.validateUserCreationRequest = (body) => {
    return validateAgainstSchema(body, userCreationRequestSchema)
}

exports.extractUserCreationFields = (body) => {
    return extractValidFields(body, userCreationSchema)
}

exports.filterUserFields = (body) => {
    return extractValidFields(body, userInformationSchema)
}