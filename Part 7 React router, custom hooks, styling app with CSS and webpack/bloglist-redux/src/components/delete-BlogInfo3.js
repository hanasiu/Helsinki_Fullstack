import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, updateLike } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'

const BlogInfo = ({ blog }) => {
    const dispatch = useDispatch()
    const { loginUser, blogs } = useSelector((state) => ({
        loginUser: state.loginUser,
        blogs: state.blogs,
    }))

    const addLike = async (event) => {
        event.preventDefault()
        try {
            dispatch(updateLike(blog, blogs))
        } catch (e) {
            dispatch(setNotification(e.message, 'red', 5))
        }
    }

    const removeBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: blog.title,
            author: blog.author,
            user: blog.user,
            id: blog.id,
        }
        try {
            if (window.confirm(`Remove ${blogObject.title}?`)) {
                await blogService.remove(blogObject.id)
                dispatch(deleteBlog(blogObject, blogs))
                dispatch(
                    setNotification(`Remove ${blogObject.title}`, 'green', 5)
                )
            }
        } catch (e) {
            dispatch(setNotification(`remove fail: ${e.message}`, 'red', 5))
        }
    }

    return (
        <div>
            <div id="url">{blog.url}</div>
            <div id="likes">
                {blog.likes}
                <button id="likes-button" onClick={addLike} type="button">
                    like
                </button>
            </div>
            <div id="username">{blog.user.username}</div>
            {blog.user.username === loginUser.username && (
                <button id="remove-button" type="button" onClick={removeBlog}>
                    remove
                </button>
            )}
        </div>
    )
}

export default BlogInfo
