const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '63c10ba462bc6706229a4f91',
        title: 'T1',
        author: 'Faker',
        url: 'https://www.t1.gg/',
        __v: 0,
    },
    {
        _id: '63c10ba462bc6706229a4f92',
        title: 'Tottenham Hotspur',
        author: 'Daniel Philip Levy',
        url: 'https://www.tottenhamhotspur.com/',
        likes: 99,
        __v: 0,
    },
]

const initialUsers = [
    {
        username: 'root',
        password: 'password',
    },
    {
        username: 'kane',
        password: 'son',
    },
]

const testLogin = [
    {
        username: initialUsers[0].username,
        password: initialUsers[0].password,
    },
    {
        username: initialUsers[1].username,
        password: initialUsers[1].password,
    },
]

const listWithoutBlogs = []

const listWithOneBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        id: '5a422aa71b54a676234d17f8',
    },
]

const listWithManyBlogs = [
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        id: '5a422b3a1b54a676234d17f9',
    },
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        id: '5a422a851b54a676234d17f7',
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        id: '5a422b891b54a676234d17fa',
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        id: '5a422aa71b54a676234d17f8',
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        id: '5a422ba71b54a676234d17fb',
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        id: '5a422bc61b54a676234d17fc',
    },
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'temporary',
        author: 'unknown',
        url: 'any.com',
        likes: 0,
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    testLogin,
    listWithoutBlogs,
    listWithOneBlog,
    listWithManyBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
}
