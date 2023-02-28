const { extractValidFields, validateAgainstSchema } = require('../../lib/validator')

const enrollmentInformationSchema = {
    id: {required: true},
    role: {required: true},
    courseId: {required: false},
    userId: {required: true},
    sectionId: {required: false}
}

const enrollmentInsertSchema = {
    role: {required: true},
    courseId: {required: false},
    userId: {required: true},
    sectionId: {required: false}
}

exports.extractEnrollmentFields = (body) => {
    return extractValidFields(body, enrollmentInformationSchema)
}

exports.validateEnrollmentCreationRequest = (body) => {
    return validateAgainstSchema(body, enrollmentInsertSchema)
}