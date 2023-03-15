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
    return { studentCourses: state.courses.studentCourses, teacherCourses: state.courses.teacherCourses }
}

export function getCourse(state) {
    return state.courses.course
}