const { extractValidFields, validateAgainstSchema } = require('../../lib/validator')

const lectureInsertSchema = {
    courseId: {required: true},
    title: {required: true},
    order: {required: false},
    description: {required: false}
}

const lectureUpdateSchema = {
    title: {required: false},
    order: {required: false},
    description: {required: false}
}

exports.extractLectureUpdateFields = (body) => {
    return extractValidFields(body, lectureUpdateSchema)
}

exports.validateLectureCreationRequest = (body) => {
    return validateAgainstSchema(body, lectureInsertSchema)
}