//import PropTypes from 'prop-types'
import { useNotificationDispatch } from '../NotificationContext'
import { useUserDispatch } from '../UserContext'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'

const LoginForm = () => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const notifier = useNotificationDispatch()
    const userDispatch = useUserDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userInput = {
                username: username,
                password: password,
            }
            const user = await loginService.login({
                ...userInput,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            await blogService.setToken(user.token)
            userDispatch(user)
            setPassword('')
            setUsername('')
            notifier(`hi ${user.username}`, 'green')
        } catch (e) {
            notifier(`wrong username or password: ${e.message}`, 'red')
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                    />
                </div>
                <button type="submit" id="login-button">
                    login
                </button>
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
