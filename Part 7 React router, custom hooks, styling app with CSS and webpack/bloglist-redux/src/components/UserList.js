import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    if (!user) {
        return null
    }

    return (
        <tr key={user.id}>
            <td className="user-cell">
                <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td className="blogs-cell">{user.blogs.length}</td>
        </tr>
    )
}

const UserList = () => {
    const users = useSelector(({ users }) => {
        return users
    })
    const sortedUsers = [...users].sort(
        (a, b) => a.blogs.length - b.blogs.length
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(
                        (user) => user && <User key={user.id} user={user} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UserList
