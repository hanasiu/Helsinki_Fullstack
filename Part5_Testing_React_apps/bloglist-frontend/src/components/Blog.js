import { useState } from 'react'
import BlogInfo from './BlogInfo'


const Blog = ({ blog, clickLike, user, deleteBlog, setRedMessage, setGreenMessage, setBlogs, blogs }) => {
  const [view, setView] = useState(false)

  const hideWhenView = { display: view ? 'none' : '' }
  const showWhenView = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const lineStyle = {
    display:'inline-block'
  }


  return (
    <div className='blog' style={blogStyle}>
      <span style={lineStyle} id='title'>{blog.title} -</span>
      <span style={lineStyle} id='author'>- {blog.author}</span>
      <button id='view-button' style={hideWhenView} onClick={toggleView}>
        view
      </button>
      <button id='hide-button' style={showWhenView} onClick={toggleView}>
        hide
      </button>
      {view === true && <BlogInfo blog={blog} user={user}
        clickLike={clickLike} deleteBlog={deleteBlog} setRedMessage={setRedMessage}
        setGreenMessage={setGreenMessage} setBlogs={setBlogs} blogs={blogs}/>}
    </div>
  )
}

export default Blog
