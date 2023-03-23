import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const updateLike = async (blogId) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${blogId}/like`, {}, config)
    return response.data
}

const updateComment = async (blogId, newComment) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(
        `${baseUrl}/${blogId}/comments`,
        {
            comment: newComment,
        },
        config
    )
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, updateLike, updateComment, remove, setToken }
