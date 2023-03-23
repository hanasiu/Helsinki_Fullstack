import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
    },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blogObject, blogFormRef) => {
    return async (dispatch) => {
        blogFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(blogObject)
        dispatch(appendBlog(returnedBlog))
    }
}

export const deleteBlog = (blogObject, blogs) => {
    return async (dispatch) => {
        await blogService.remove(blogObject.id)
        const returnedBlogs = blogs.filter((n) => n.id !== blogObject.id)
        dispatch(setBlogs(returnedBlogs))
    }
}

export const updateLike = (blogObject, blogs) => {
    return async (dispatch) => {
        const result = await blogService.updateLike(blogObject.id)
        const newBlogs = blogs.map((original) => {
            return original.id === blogObject.id ? result : original
        })
        dispatch(setBlogs(newBlogs))
    }
}

export const updateComment = (blogId, newComment, blogs) => {
    return async (dispatch) => {
        const result = await blogService.updateComment(blogId, newComment)
        const newBlogs = blogs.map((original) => {
            return original.id === blogId ? result : original
        })
        dispatch(setBlogs(newBlogs))
    }
}

export default blogSlice.reducer
