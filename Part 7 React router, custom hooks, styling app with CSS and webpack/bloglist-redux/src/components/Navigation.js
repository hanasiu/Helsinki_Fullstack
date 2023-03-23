import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavigationDiv } from '../style'

const Navigation = () => {
    const loginUser = useSelector(({ loginUser }) => {
        return loginUser
    })

    const padding = {
        padding: 5
      }


    return (
        <NavigationDiv>
            <Link style={padding} to="/">
                home
            </Link>
            <Link style={padding} to="/blogs">
                blogs
            </Link>
            <Link style={padding} to="/users">
                users
            </Link>
            {loginUser.username ? (
                <em>{loginUser.username} logged in</em>
            ) : (
                <Link style={padding} to="/login">
                    login
                </Link>
            )}
        </NavigationDiv>
    )
}

export default Navigation