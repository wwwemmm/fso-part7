import { useRef } from 'react'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle, setAuthor, setUrl, resetCreateBlog  } from '../reducers/createBlogReducer'
import { Table, Form, Button } from 'react-bootstrap'

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
      dispatch(setNotification(`a new blog ${title} by ${author} added`, 5, 'success'))
      blogFormRef.current.toggleVisibility()
      dispatch(resetCreateBlog())

    } catch (exception) {
      console.log('exception',exception)
      dispatch(setNotification('Missing title, author or url', 5, 'danger'))
    }}

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            value={title}
            type="text"
            name= 'title'
            onChange={(e) => dispatch(setTitle(e.target.value))}
            placeholder='write blog title here'
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            value={author}
            type="text"
            name= 'author'
            onChange={(e) => dispatch(setAuthor(e.target.value))}
            placeholder='write blog author here'
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            value={url}
            type="text"
            name= 'url'
            onChange={(e) => dispatch(setUrl(e.target.value))}
            placeholder='write blog url here'
          />
          <Button variant="primary" id="summit-blog-button" type="submit">create</Button>
        </Form.Group>
      </Form>
      <br></br>
    </Togglable>
  )}

export default BlogForm