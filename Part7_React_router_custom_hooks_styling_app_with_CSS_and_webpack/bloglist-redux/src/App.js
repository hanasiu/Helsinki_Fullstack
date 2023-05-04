import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import Home from './components/Home'
import UserBlogs from './components/UserBlogs'
import BlogInfo from './components/BlogInfo'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { getUser } from './reducers/loginUserReducer'
import { Page, Footer } from './style'

const App = () => {
    const { loginUser, blogs } = useSelector((state) => ({
        loginUser: state.loginUser,
        blogs: state.blogs,
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    const match = useMatch('/blogs/:id')
    const matchBlog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null

    return (
        <Page>
            <Navigation />

            <Notification />
            <Routes>
                <Route path="/blogs" element={<BlogList />} />
                <Route
                    path="/users"
                    element={
                        loginUser.username ? (
                            <UserList />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Home />} />
                <Route path="/users/:id" element={<UserBlogs />}></Route>
                <Route
                    path="/blogs/:id"
                    element={<BlogInfo blog={matchBlog} />}
                ></Route>
            </Routes>
            <Footer>
                <em>Blog app, Department of Computer Science 2023</em>
            </Footer>
        </Page>
    )
}

export default App
