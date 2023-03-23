const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: 'token missing or invalid' })
    // }
    const user = request.user

    if (!user) {
        return response
            .status(401)
            .json({ error: 'token is missing or invalid' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author || 'unknown',
        url: body.url,
        user: user,
        likes: body.likes || 0,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    if (!blog) {
        return response.status(204).end()
    }
    if (blog.user.toString() === user._id.toString()) {
        //확인
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).end({ error: 'invalid user' })
    }
})

// blogsRouter.put('/:id/like', async (request, response) => {
//     const body = request.body
//     //const user = request.user
//     const blog = await Blog.findById(request.params.id)

//     if (!blog) {
//         return response.status(404).json({ error: 'blog not found' })
//     }

//     const modifiedBlog = {
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes,
//         comments: body.comments,
//         user: blog.user,
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//         request.params.id,
//         modifiedBlog,
//         { new: true }
//     ).populate('user', { username: 1 })

//     response.json(updatedBlog.toJSON())
//     // for like button blog user not need to be same with login user.
//     // if(blog.user.toString() === user._id.toString()) {
//     //   const updatedBlog =
//     // await Blog.findByIdAndUpdate(request.params.id, modifiedBlog, { new: true })
//     //   response.json(updatedBlog)
//     // } else {
//     //   response.status(401).json({
//     //     error: 'invalid user'
//     //   })
//     // }
// })

blogsRouter.put('/:id/like', async (request, response) => {
    const blogId = request.params.id

    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $inc: { likes: 1 } },
        { new: true }
    ).populate('user', { username: 1 })

    if (!updatedBlog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    response.json(updatedBlog.toJSON())
})

blogsRouter.put('/:id/comments', async (request, response) => {
    const body = request.body
    const comment = body.comment
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { $push: { comments: comment } },
        { new: true, runValidators: true }
    ).populate('user', { username: 1 })

    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
