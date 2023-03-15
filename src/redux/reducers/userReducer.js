const { LOGIN, LOGOUT, SET_USER } = require('../actions')

const emptyState = {
    user: {},
    status: null
}

function userReducer(state = emptyState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                status: action.status,
                user: action.user
            }
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT:
            return emptyState
        default:
            return state
    }
}

export default userReducer