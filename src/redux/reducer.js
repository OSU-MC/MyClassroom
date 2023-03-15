import { combineReducers } from 'redux'

import userReducer from './reducers/userReducer'
import coursesReducer from './reducers/coursesReducer'

const rootReducer = combineReducers({
    user: userReducer, 
    courses: coursesReducer
})

export default rootReducer