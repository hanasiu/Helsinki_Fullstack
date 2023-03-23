import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogs = () => {
    const blogs = useSelector(({ blogs }) => {
        return blogs
    })
    const userId = useParams().id
    const sortedBlogs = blogs
        .filter((blog) => blog.user.id === userId)
        .sort((a, b) => b.likes - a.likes)
    return (
        <div>
            <h4>added blogs</h4>
            {sortedBlogs.map(
                (blog) => blog && <li key={blog.id}>{blog.title}</li>
            )}
        </div>
    )
}

export default UserBlogs
