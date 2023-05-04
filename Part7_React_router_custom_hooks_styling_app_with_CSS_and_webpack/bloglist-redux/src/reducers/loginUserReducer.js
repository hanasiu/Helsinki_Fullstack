import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = {
    username: null,
    password: null,
}

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const { setUser } = loginUserSlice.actions

export const loginUser = (userInput) => {
    return async (dispatch) => {
        const loginUser = await loginService.login(userInput)
        window.localStorage.setItem(
            'loggedBlogappUser',
            JSON.stringify(loginUser)
        )
        await blogService.setToken(loginUser.token)
        dispatch(setUser(loginUser))
    }
}

export const getUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }
}

export default loginUserSlice.reducer
