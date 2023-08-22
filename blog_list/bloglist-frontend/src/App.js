import { useState, useEffect, useRef } from 'react'
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
  //const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
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

  /*
  const addBlog = async  (blogObject) => {
    console.log('adding blog ',blogObject.title, blogObject.author)
    try {
      const returnedBlog = await blogService.create(blogObject)
      //console.log("addBlog user:", user)
      const succeedAddBlog = {
        ...returnedBlog,
        'user':user
      }

      await setBlogs(blogs.concat(succeedAddBlog))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5, 'fulfilled'))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification('Missing title, author or url', 5, 'error'))
    }
  }
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
   */

  const handleLogout = () => {
    dispatch(setUser(null))
    console.log('logout: ', user)
    window.localStorage.removeItem('loggedBlogappUser')
  }


  const updateBlog = async (blogid, blogObject) => {
    console.log('adding likes',blogObject.title, blogObject.author)
    try {
      const returnedBlog = await blogService.update(blogid,blogObject)

      const succeedUpdateBlog = {
        ...returnedBlog,
        'user':user
      }
      const newBlogs = blogs.filter(blog => blog.id !== blogid).concat(succeedUpdateBlog)
      const sortedBlog = await newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlog)

      dispatch(setNotification(`Likes of ${blogObject.title} are increased`, 5, 'fulfilled'))
    } catch (exception) {
      dispatch(setNotification('fail to increase likes', 5, 'error'))
    }}

  const deleteBlog = async (blog) => {
    console.log('deleting blog',blog.title, blog.author)
    try {
      await blogService.deleteBlog(blog.id)
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      const sortedBlog = await newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlog)

      dispatch(setNotification(`${blog.title} is deleted`, 5, 'fulfilled'))
    } catch (exception) {
      dispatch(setNotification(`fail to delete ${blog.title}`, 5, 'error'))
    }}

  console.log('user in app: ', user)
  console.log('user === null', user===null)
  console.log('type of user: ', typeof(user))

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
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
        )}
      </div>
      }
    </div>
  )
}

export default App