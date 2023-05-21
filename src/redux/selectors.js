/*
    USER SELECTORS
*/

export function getUserState(state) {
    return state.user
}

/*
    COURSES SELECTORS
*/

export function getCourses(state) {
    return state.courses
}

export function getEnrollments(state) {
    return state.courses.enrollments
}

export function getSections(state) {
    return state.courses.sections
}

export function getLectures(state) {
    return state.courses.lectures
}

export function getQuestions(state) {
    return state.courses.questions
}

/*
    LECTURE SELECTORS
*/

export function getLectureDetails(state) {
    return state.lectures
}