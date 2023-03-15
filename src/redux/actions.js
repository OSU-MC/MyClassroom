/*
    USER ACTIONS
*/

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_USER = "SET_USER"

export function login(user, status) {
    return { type: LOGIN, user, status }
}

export function logout() {
    return { type: LOGOUT }
}

export function setUser(user) {
    return { type: SET_USER, user }
}

/*
    COURSES ACTIONS
*/

export const SET_COURSES = "SET_COURSES"
export const CREATE_COURSE = "CREATE_COURSE"
export const SET_COURSE = "SET_COURSE"
export const DELETE_COURSE = "DELETE_COURSE"
export const UPDATE_COURSE = "UPDATE_COURSE"

export function setCourses(studentCourses, teacherCourses) {
    return { type: SET_COURSES, studentCourses, teacherCourses }
}

export function createCourse(course) {
    return { type: CREATE_COURSE, course }
}

export function setCourse(course) {
    return { type: SET_COURSE, course }
}

export function deleteCourse(id) {
    return { type: DELETE_COURSE, id }
}

export function updateCourse(course, id) {
    return { type: UPDATE_COURSE, course, id }
}