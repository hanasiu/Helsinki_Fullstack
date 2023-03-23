import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'

const BlogList = () => {
    const { loginUser, blogs } = useSelector((state) => ({
        loginUser: state.loginUser,
        blogs: state.blogs,
      }));

    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    const blogFormRef = useRef()
    const blogForm = () => (
        <Togglable buttonLabel="create new" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
    )


    return (
        <div>
            {loginUser ? blogForm() : null}
            {sortedBlogs.map(
                (blog) => blog && 
                <Link to={`/blogs/${blog.id}`} key={blog.id}>
                    <div>{`${blog.title} - ${blog.author}`}</div></Link>
            )}
        </div>
    )
}

export default BlogList
