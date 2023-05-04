//get from chapter 5 exercise and develop
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NOTIFY_GREEN':
            return { message: action.message, type: 'green' }
        case 'NOTIFY_RED':
            return { message: action.message, type: 'red' }
        case 'CLEAR':
            return { message: null, type: null }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        ''
    )

    const setNotification = (message, type) => {
        const actionType = type === 'green' ? 'NOTIFY_GREEN' : 'NOTIFY_RED'
        notificationDispatch({ type: actionType, message })
        setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
    }

    return (
        <NotificationContext.Provider value={[notification, setNotification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
