import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'

const Menu = () => {
  const user = useSelector(state => state.userData.user)
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }
  const handleLogout = () => {
    dispatch(setUser(null))
    console.log('logout: ', user)
    window.localStorage.removeItem('loggedBlogappUser')
  }
  return (
    <div>
      <Link style={padding} to="/"></Link>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <span>{user.name} logged in</span>
      <button onClick = {handleLogout} >logout</button>
    </div>
  )
}

export default Menu