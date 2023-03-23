import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button } from '../style'

const BlogForm = ({ blogFormRef }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })
    const dispatch = useDispatch()

    const handleTitleChange = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value })
    }
    const handleAuthorChange = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value })
    }
    const handleUrlChange = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value })
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
        }
        try {
            dispatch(createBlog(blogObject, blogFormRef))
            dispatch(
                setNotification(
                    `a new blog ${blogObject.title} by ${blogObject.author} added`,
                    'green',
                    5
                )
            )
            setNewBlog({
                title: '',
                author: '',
                url: '',
            })
        } catch (e) {
            dispatch(
                setNotification(
                    `fail to add a blog: title or author or url are blank: ${e.message}`,
                    'red',
                    5
                )
            )
        }
    }

    return (
        <div>
            <h2>create a new blog</h2>

            <form onSubmit={addBlog}>
                title:{' '}
                <input
                    value={newBlog.title}
                    onChange={handleTitleChange}
                    placeholder="write blog title here"
                    id="title-input"
                />
                <br />
                author:{' '}
                <input
                    value={newBlog.author}
                    onChange={handleAuthorChange}
                    placeholder="write blog author here"
                    id="author-input"
                />
                <br />
                url:{' '}
                <input
                    value={newBlog.url}
                    onChange={handleUrlChange}
                    placeholder="write blog url here"
                    id="url-input"
                />
                <br />
                <Button id="create-button" type="submit">
                    create
                </Button>
            </form>
        </div>
    )
}


export default BlogForm
