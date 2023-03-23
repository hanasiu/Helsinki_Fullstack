//import PropTypes from 'prop-types'
import { loginUser } from '../reducers/loginUserReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '../style'

const LoginForm = () => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userInput = {
                username: username,
                password: password,
            }
            const result = await dispatch(loginUser(userInput))
            setPassword('')
            setUsername('')
            dispatch(setNotification(`hi ${userInput.username}`, 'green', 5))
            navigate('/')
        } catch (e) {
            dispatch(
                setNotification(
                    `wrong username or password: ${e.message}`,
                    'red',
                    5
                )
            )
        }
    }
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <Input
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                    />
                </div>
                <div>
                    password
                    <Input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                    />
                </div>
                <Button type="submit" id="login-button">
                    login
                </Button>
            </form>
        </div>
    )
}

// LoginForm.propTypes = {
//     handleSubmit: PropTypes.func.isRequired,
//     handleUsernameChange: PropTypes.func.isRequired,
//     handlePasswordChange: PropTypes.func.isRequired,
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
// }

export default LoginForm
