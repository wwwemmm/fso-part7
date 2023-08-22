import { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import './index.css'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userData.user)
  const blogs = useSelector(state => state.blogs)

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

  const handleLogout = () => {
    dispatch(setUser(null))
    console.log('logout: ', user)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      {user === null && <Notification />}
      {user === null && <LoginForm />}
      {user &&
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          <span>{user.name} logged in</span>
          <button onClick = {handleLogout} >logout</button>
        </p>
        <BlogForm />

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App