import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogForm = ({ blogFormRef }) => {
    const queryClient = useQueryClient()
    const notifier = useNotificationDispatch()

    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })

    const newBlogMutation = useMutation(blogService.create, {
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData('blogs')
            queryClient.setQueryData('blogs', blogs.concat(newBlog))
        },
        onError: (err) => {
            notifier(`error: ${err.message}`)
        },
    })

    const handleTitleChange = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value })
    }
    const handleAuthorChange = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value })
    }
    const handleUrlChange = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value })
    }

    const addBlog = async (blog) => {
        blogFormRef.current.toggleVisibility()
        newBlogMutation.mutate({ ...blog, likes: 0 })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
        }
        try {
            await addBlog(blogObject)
            notifier(
                `a new blog ${blogObject.title} by ${blogObject.author} added`,
                'green'
            )
            setNewBlog({
                title: '',
                author: '',
                url: '',
            })
        } catch (e) {
            notifier(
                `fail to add a blog: title or author or url are blank: ${e.message}`,
                'red'
            )
        }
    }

    return (
        <div>
            <h2>create a new blog</h2>

            <form onSubmit={handleSubmit}>
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
                <button id="create-button" type="submit">
                    create
                </button>
            </form>
        </div>
    )
}

export default BlogForm
