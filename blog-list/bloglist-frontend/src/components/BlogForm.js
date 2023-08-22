import { useRef } from 'react'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setAuthor, setUrl, resetCreateBlog  } from '../reducers/createBlogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.userData.user)
  const title = useSelector(state => state.createBlog.title)
  const author = useSelector(state => state.createBlog.author)
  const url = useSelector(state => state.createBlog.url)

  const addBlog = async  (event) => {
    event.preventDefault()
    try {
      await dispatch(createBlog(
        {
          title,
          author,
          url,
          user
        }))
      dispatch(setNotification(`a new blog ${title} by ${author} added`, 5, 'fulfilled'))
      blogFormRef.current.toggleVisibility()
      dispatch(resetCreateBlog())

    } catch (exception) {
      console.log('exception',exception)
      dispatch(setNotification('Missing title, author or url', 5, 'error'))
    }}

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>title:
          <input
            value={title}
            name= 'title'
            onChange={(e) => dispatch(setTitle(e.target.value))}
            placeholder='write blog title here'
          />
        </div>
        <div>author:
          <input
            value={author}
            name = 'author'
            onChange={(e) => dispatch(setAuthor(e.target.value))}
            placeholder='write blog author here'
          />
        </div>
        <div>url:
          <input
            value={url}
            name = 'url'
            onChange={(e) => dispatch(setUrl(e.target.value))}
            placeholder='write blog url here'
          />
        </div>
        <button id="summit-blog-button" type="submit">create</button>
      </form>
    </Togglable>
  )}

export default BlogForm