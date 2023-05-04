import { useSelector } from 'react-redux'

const Notification = () => {
    const { message, type } = useSelector(({ notification }) => {
        return notification
    })
    const style = {
        color: type === 'green' ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (type === null) {
        return null
    }
    return (
        <div className={type} style={style}>
            {message}
        </div>
    )
}

export default Notification
