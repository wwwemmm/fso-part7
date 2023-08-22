import { useRef } from 'react'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.userData.user)

  const addBlog = async  (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    console.log('adding a new blog', title, author)

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
    } catch (exception) {
      console.log('exception',exception)
      dispatch(setNotification('Missing title, author or url', 5, 'error'))
    }}


  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>title:
          <input
            name= 'title'
            placeholder='write blog title here'
          />
        </div>
        <div>author:
          <input
            name = 'author'
            placeholder='write blog author here'
          />
        </div>
        <div>url:
          <input
            name = 'url'
            placeholder='write blog url here'
          />
        </div>
        <button id="summit-blog-button" type="submit">create</button>
      </form>
    </Togglable>
  )}

export default BlogForm