import { useState } from 'react'

const BlogInfo = ({
  blog,
  user,
  clickLike,
  deleteBlog,
  setRedMessage,
  setGreenMessage,
  setBlogs,
  blogs,
}) => {
  const [updatedLikes, setLikes] = useState(blog.likes)
  const addLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      likes: blog.likes + 1,
      id: blog.id,
    }
    try {
      const result = await clickLike(blogObject)
      const newBlogs = blogs.map((original) => {
        return original.id === blogObject.id ? result : original
      })
      //console.log(newBlogs)
      setLikes(result.likes)
      setBlogs(newBlogs)
    } catch (e) {
      setRedMessage(e.message)
      setTimeout(() => {
        setRedMessage(null)
      }, 5000)
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
        await deleteBlog(blogObject)
        setBlogs(blogs.filter((n) => n.id !== blogObject.id))
        setGreenMessage(`Remove ${blogObject.title}`)
        setTimeout(() => {
          setGreenMessage(null)
        }, 5000)
      }
    } catch (e) {
      setRedMessage(`remove fail: ${e.message}`)
      setTimeout(() => {
        setRedMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <div id="url">{blog.url}</div>
      <div id="likes">
        {updatedLikes}
        <button id="likes-button" onClick={addLike} type="button">
          like
        </button>
      </div>
      <div id="username">{blog.user.username}</div>
      {blog.user.username === user.username && (
        <button id="remove-button" type="button" onClick={removeBlog}>
          remove
        </button>
      )}
    </div>
  )
}

export default BlogInfo
