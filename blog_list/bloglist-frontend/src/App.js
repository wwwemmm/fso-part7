import { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import './index.css'
import LoginForm from './components/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import Menu from './components/Menu'
import {
  Routes, Route, Link,
  useMatch, useNavigate
} from 'react-router-dom'
//

const BlogsPage = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      <BlogForm />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const UsersList = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user =>
          <li key={user.id} >
            <Link to={`/users/${user.id}`}>{user.name}  </Link>
            <span>{user.blogs.length}</span>
          </li>)}
      </ul>
    </div>
  )
}

const UserDetail = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map(blog =>
        <li key = {blog.id}>{blog.title}</li>
      )}
    </div>
  )
}


const App = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.userData.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  console.log('initializeBlogs: ', blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  console.log('initila_loginUser: ', loginUser)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])
  console.log('initial_users: ', users)


  const match = useMatch('/users/:id')
  console.log('match: ', match)

  const user = match
    ? users.find(u => u.id.toString() === match.params.id.toString())
    : null


  return (
    <div>
      {loginUser === null && <Notification />}
      {loginUser === null && <LoginForm />}
      {loginUser &&
      <div>
        <Menu />
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route path="/users/:id" element={<UserDetail user={user} />} />
          <Route path="/" element={<BlogsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </div>
      }
    </div>
  )
}

export default App