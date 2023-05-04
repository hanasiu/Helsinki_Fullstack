import { createContext, useReducer, useContext } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user
        default:
            return state
    }
}

const UserContext = createContext()

export const useUserValue = () => {
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[0]
}

export const useUserDispatch = () => {
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[1]
}

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    const getUser = (user) => {
        userDispatch({ type: 'SET_USER', user })
    }

    return (
        <UserContext.Provider value={[user, getUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
