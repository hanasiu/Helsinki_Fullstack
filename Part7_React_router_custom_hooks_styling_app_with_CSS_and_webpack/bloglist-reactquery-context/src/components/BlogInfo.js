import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'
import { useUserValue } from '../UserContext'

const BlogInfo = ({ blog }) => {
    const notifier = useNotificationDispatch()
    const user = useUserValue()
    const queryClient = useQueryClient()

    const updateBlogMutation = useMutation(blogService.update, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        },
        onError: (err) => {
            notifier(`update rejected: ${err.message}`)
        },
    })

    const addLike = async (blog) => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        console.log(typeof blog.id)
        updateBlogMutation.mutate(updatedBlog)
        notifier(`blog '${blog.title}' liked`, 'green')
    }

    const deleteBlogMutation = useMutation(blogService.remove, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        },
        onError: (err) => {
            notifier(`remove fail: ${err.message}`, 'red')
        },
    })

    const removeBlog = async (blog) => {
        if (window.confirm(`Remove ${blog.title}?`)) {
            deleteBlogMutation.mutate(blog.id)
            notifier(`blog '${blog.title}' deleted`, 'green')
        }
    }

    return (
        <div>
            <div id="url">{blog.url}</div>
            <div id="likes">
                {blog.likes}
                <button
                    id="likes-button"
                    onClick={() => addLike(blog)}
                    type="button"
                >
                    like
                </button>
            </div>
            <div id="username">{blog.user.username}</div>
            {blog.user.username === user.username && (
                <button
                    id="remove-button"
                    type="button"
                    onClick={() => removeBlog(blog)}
                >
                    remove
                </button>
            )}
        </div>
    )
}

export default BlogInfo
