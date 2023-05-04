import { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

import Notification from './components/Notification'

import { useUserDispatch, useUserValue } from './UserContext'

const App = () => {
    const userDispatch = useUserDispatch()
    const user = useUserValue()

    const blogFormRef = useRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userDispatch(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogForm = () => (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
    )

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm />
        </Togglable>
    )

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            {user === null && loginForm()}
            {user !== null && (
                <div>
                    <p>{user.username} Logged in</p>
                    <h2>create new</h2>
                    {blogForm()}
                    <BlogList />
                </div>
            )}
        </div>
    )
}

export default App
