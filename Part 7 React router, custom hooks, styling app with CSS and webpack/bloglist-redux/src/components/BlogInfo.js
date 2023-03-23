import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, updateLike, updateComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '../style'

const BlogInfo = ({ blog }) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                navigate('/')
            }
        } catch (e) {
            dispatch(setNotification(`remove fail: ${e.message}`, 'red', 5))
        }
    }

    const addComment = async (event) => {
        event.preventDefault()
        console.log(blog)
        const commentObject = {
            content: comment,
        }
        try {
            await dispatch(updateComment(blog.id, commentObject, blogs))
            dispatch(
                setNotification(
                    `Comment '${commentObject.content}' added`,
                    'green',
                    5
                )
            )
            setComment('')
        } catch (e) {
            dispatch(
                setNotification(`add comment fail: ${e.message}`, 'red', 5)
            )
        }
    }

    return (
        blog && (
            <div>
                <h2>
                    {blog.title} {blog.author}
                </h2>
                <div id="url">{blog.url}</div>
                <div id="likes">
                    {blog.likes}
                    <Button id="likes-button" onClick={addLike} type="button">
                        like
                    </Button>
                </div>
                <div id="username">{blog.user.username}</div>
                {blog.user.username === loginUser.username && (
                    <Button
                        id="remove-button"
                        type="button"
                        onClick={removeBlog}
                    >
                        remove
                    </Button>
                )}
                <h3>comments</h3>
                <form onSubmit={addComment}>
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="comment about this blog"
                        id="comment-input"
                    ></input>
                    <Button type="submit">add comment</Button>
                </form>
                {blog.comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.content}{' '}
                        {new Date(comment.timestamp).toLocaleString()}
                    </li>
                ))}
            </div>
        )
    )
}

export default BlogInfo
