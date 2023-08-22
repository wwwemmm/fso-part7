import { useEffect, useState } from 'react'
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
import { setNotification } from './reducers/notificationReducer'
import { removeBlog, increadLike } from './reducers/blogReducer'
import { setComment, createComment } from './reducers/commentReducer'

//

const BlogsPage = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      <BlogForm />
      {blogs.map(blog =>
        <li key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>{blog.title}  </Link>
        </li>
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


const BlogDetail = ({ blog, handleIncreaseLike, handleDelete }) => {
  const loginUser = useSelector(state => state.userData.user)
  const content = useSelector(state => state.comment)
  const dispatch = useDispatch()
  if (!blog) {
    return null
  }
  const handleCreateComment = async (event) => {
    event.preventDefault()
    try{
      console.log('handleCreateComment content: ', content)
      await dispatch(createComment(blog, content))
    } catch(exception) {
      console.log(exception)
    }
  }
  const showWhenIsCreator = blog.user.id.toString()===loginUser.id.toString() ? true : false
  console.log('showWhenIsCreator ', showWhenIsCreator)
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href='{blog.url}'>{blog.url}</a>
      <p>
        <span>{blog.likes} likes </span>
        <button onClick={handleIncreaseLike}>like</button>
      </p>
      <p>
        <span>added by {blog.user.name} </span>
        {showWhenIsCreator && <button onClick={handleDelete}>remove the blog</button>}
      </p>
      <h3>comments</h3>
      <form onSubmit={handleCreateComment}>
        <input value={content} onChange={(e) => {dispatch(setComment(e.target.value))}}></input>
        <button>add comment</button>
      </form>
      {blog.comments.map(comment =>
        <li key={comment.id}>{comment.content}</li>
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

  const handleIncreaseLike = async () => {
    console.log('adding likes',blog.title, blog.author)
    try {
      await dispatch(increadLike(blog))
      dispatch(setNotification(`Likes of ${blog.title} are increased`, 5, 'fulfilled'))
    }
    catch (exception) {
      dispatch(setNotification('fail to increase likes', 5, 'error'))
    }}

  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      console.log('deleting blog',blog.title, blog.author)
      try {
        await dispatch(removeBlog(blog))
        dispatch(setNotification(`${blog.title} is deleted`, 5, 'fulfilled'))
      }catch (exception) {
        console.log('exception: ', exception)
        dispatch(setNotification(`fail to delete ${blog.title}`, 5, 'error'))
      }
    }
  }

  const matchUserID = useMatch('/users/:id')

  const user = matchUserID
    ? users.find(u => u.id.toString() === matchUserID.params.id.toString())
    : null

  const matchBlogID = useMatch('/blogs/:id')

  const blog = matchBlogID
    ? blogs.find(b => b.id.toString() === matchBlogID.params.id.toString())
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
          <Route path="/blogs/:id" element={<BlogDetail blog={blog} handleIncreaseLike={handleIncreaseLike} handleDelete={handleDelete}/>} />
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