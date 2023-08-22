import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, increadLike } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userData.user)
  const [showDetail, setShowDetail] = useState(false)
  console.log('blog: ', blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleIncreaseLike = async () => {
    console.log('adding likes',blog.title, blog.author)
    try {
      await dispatch(increadLike(blog))
      dispatch(setNotification(`Likes of ${blog.title} are increased`, 5, 'success'))
    }
    catch (exception) {
      dispatch(setNotification('fail to increase likes', 5, 'danger'))
    }}


  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      console.log('deleting blog',blog.title, blog.author)
      try {
        await dispatch(removeBlog(blog))
        dispatch(setNotification(`${blog.title} is deleted`, 5, 'success'))
      }catch (exception) {
        console.log('exception: ', exception)
        dispatch(setNotification(`fail to delete ${blog.title}`, 5, 'danger'))
      }
    }
  }
  console.log('blog: ', blog)
  console.log('blog.author:', blog.author)
  console.log('user.id', user.id)

  const showWhenIsCreator = { display: blog.user.id.toString()===user.id.toString() ? '' : 'none' }
  return (
    <div style={blogStyle} className='blog'>
      {!showDetail &&
    <p>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setShowDetail(!showDetail)} className='view-button'>view</button>
    </p>
      }
      {showDetail &&
    <div>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setShowDetail(!showDetail)}>hide</button>
      <p>{blog.url}</p>
      <p>
        <span>likes {blog.likes}</span>
        <button onClick = {handleIncreaseLike} className='like'>like</button>
      </p>
      <p>
        <span>{blog.user.name}</span>
        <button style={showWhenIsCreator} onClick={handleDelete} className='remove'>remove</button>
      </p>
    </div>
      }
    </div>
  )
}
export default Blog