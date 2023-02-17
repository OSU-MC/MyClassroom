const { extractValidFields, validateAgainstSchema } = require('../../lib/validator')

const userInformationSchema = {
    id: { required: false },
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

const userLoginRequestSchema = {
    email: { required: true },
    rawPassword: { required: true }
}

const userPasswordChangeRequestSchema = {
    oldPassword: { required: true },
    rawPassword: { required: true },
    confirmedPassword: { required: true }
}

const userPasswordResetRequestSchema = {
    email: { required: true },
    passwordResetCode: { required: true },
    rawPassword: { required: true },
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

exports.validateUserLoginRequest = (body) => {
    return validateAgainstSchema(body, userLoginRequestSchema)
}

exports.validateUserPasswordChangeRequest = (body) => {
    return validateAgainstSchema(body, userPasswordChangeRequestSchema)
}

exports.validateUserPasswordResetRequest = (body) => {
    return validateAgainstSchema(body, userPasswordResetRequestSchema)
}