import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { RedNotification, GreenNotification } from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [redMessage, setRedMessage] = useState(null)
  const [greenMessage, setGreenMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      await blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setGreenMessage(`hi ${user.username}`)
      setTimeout(() => {
        setGreenMessage(null)
      }, 5000)
    } catch (e) {
      setRedMessage(`wrong username or password: ${e.message}`)
      setTimeout(() => {
        setRedMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    await setBlogs(blogs.concat(returnedBlog))
  }

  const clickLike = async (blogObject) => {
    const updateBlog = await blogService.update(blogObject.id, blogObject)
    console.log(updateBlog)
    return {
      ...blogObject,
      ...updateBlog
    }
  }

  const deleteBlog = async (blogObject) => {
    await blogService.remove(blogObject.id)
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
        setRedMessage={setRedMessage}
        setGreenMessage={setGreenMessage}
      />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogList = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return blogs.map(
      (blog) =>
        blog && (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            clickLike={clickLike}
            deleteBlog={deleteBlog}
            setRedMessage={setRedMessage}
            setGreenMessage={setGreenMessage}
            setBlogs={setBlogs}
            blogs={blogs}
          />
        )
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <RedNotification message={redMessage} />
      <GreenNotification message={greenMessage} />
      {user === null && loginForm()}
      {user !== null && (
        <div>
          <p>{user.username} Logged in</p>
          <h2>create new</h2>
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
