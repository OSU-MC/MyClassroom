const { SET_COURSES, CREATE_COURSE, SET_COURSE, DELETE_COURSE, UPDATE_COURSE } = require('../actions')

const emptyState = {
    studentCourses: [],
    teacherCourses: [],
    course: {} //current or most recent course viewed by the user
}

function coursesReducer(state = emptyState, action) {
    switch (action.type) {
        case SET_COURSES: // should be called after API returns course data for a user
            return {
                ...state,
                studentCourses: action.studentCourses,
                teacherCourses: action.teacherCourses
            }
        case SET_COURSE:
            return {
                ...state,
                course: action.course
            }
        case CREATE_COURSE: // should be called after a course has been successfully created
            return {
                ...state,
                teacherCourses: [...state.teacherCourses, action.course]
            }
        case DELETE_COURSE: // should be called after a course has been successfully deleted
            return {
                ...state,
                teacherCourses: state.teacherCourses.map((course) => {
                    if (course.id !== action.id) {
                        return course
                    }
                })
            }
        case UPDATE_COURSE:
            return {
                ...state,
                teacherCourses: state.teacherCourses.map((course) => {
                    if (course.id === action.id) {
                        return action.course
                    }
                    else {
                        return course
                    }
                })
            }
        default:
            return state
    }
}

export default coursesReducer