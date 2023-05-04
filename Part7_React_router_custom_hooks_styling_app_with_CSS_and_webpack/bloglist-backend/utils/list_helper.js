const dummy = (blogs) => {
    blogs = 1
    return blogs
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = {
        title: '',
        author: '',
        likes: 0,
    }
    for (const blog of blogs) {
        if (blog.likes > favorite.likes) favorite = blog
    }
    return favorite
}

const mostBlogs = (blogs) => {
    const authorMap = new Map()

    for (let blog of blogs) {
        authorMap.has(blog.author)
            ? authorMap.set(blog.author, authorMap.get(blog.author) + 1)
            : authorMap.set(blog.author, 1)
    }
    const sorted = [...authorMap.entries()].sort((a, b) => b[1] - a[1])
    return { author: sorted[0][0], blogs: sorted[0][1] }
}

const mostLikes = (blogs) => {
    let result = { author: '', likes: 0 }
    for (let blog of blogs) {
        if (blog.likes > result.likes) {
            result.author = blog.author
            result.likes = blog.likes
        }
    }
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
