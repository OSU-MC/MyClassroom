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

export function getLectures(state) {
    return state.courses.lectures
}