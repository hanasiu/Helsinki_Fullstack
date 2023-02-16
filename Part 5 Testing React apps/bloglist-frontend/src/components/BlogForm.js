import { useState } from 'react'

const BlogForm = ({ createBlog, setRedMessage, setGreenMessage }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }
    try {
      await createBlog(blogObject)
      setGreenMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setGreenMessage(null)
      }, 5000)
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (e) {
      setRedMessage(
        `fail to add a blog: title or author or url are blank: ${e.message}`
      )
      setTimeout(() => {
        setRedMessage(null)
      }, 5000)
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
          id='title-input'
        />
        <br />
        author:{' '}
        <input
          value={newBlog.author}
          onChange={handleAuthorChange}
          placeholder="write blog author here"
          id='author-input'
        />
        <br />
        url:{' '}
        <input
          value={newBlog.url}
          onChange={handleUrlChange}
          placeholder="write blog url here"
          id='url-input'
        />
        <br />
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
