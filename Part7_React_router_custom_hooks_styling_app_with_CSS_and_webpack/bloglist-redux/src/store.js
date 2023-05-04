import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginUserReducer from './reducers/loginUserReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        users: userReducer,
        loginUser: loginUserReducer,
    },
})

export default store
