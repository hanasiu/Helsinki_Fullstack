import { useNotificationValue } from '../NotificationContext'

export const Notification = () => {
    const notification = useNotificationValue()
    const style = {
        color: notification.type === 'green' ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (!notification.message) {
        return null
    } else {
        return (
            <div style={style}>
                {notification.message}
            </div>
        )
    }
}

export default Notification
