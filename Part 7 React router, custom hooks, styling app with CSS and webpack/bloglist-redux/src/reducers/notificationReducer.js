import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    type: null,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        notify(state, action) {
            const { message, type } = action.payload
            return {
                message: message,
                type: type,
            }
        },
        clearNotification() {
            return initialState
        },
    },
})

export const { notify, clearNotification } = notificationSlice.actions

export const setNotification = (message, type, second) => {
    return async (dispatch) => {
        dispatch(notify({ message, type }))
        setTimeout(() => {
            dispatch(clearNotification())
        }, second * 1000)
    }
}

export default notificationSlice.reducer
