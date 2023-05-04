import Blog from './Blog'
import { useQuery } from 'react-query'
import blogService from '../services/blogs'

const BlogList = () => {
    const result = useQuery(
        'blogs',
        blogService.getAll,
        {
            refetchOnWindowFocus: false,
        },
        {
            retry: 1,
        }
    )

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const blogs = result.data
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs.map((blog) => blog && <Blog key={blog.id} blog={blog} />)
}

export default BlogList
