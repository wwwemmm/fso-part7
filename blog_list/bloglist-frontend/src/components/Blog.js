import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog , user }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLike = async () => {
    const newBlog = {
      'user':blog.user.id,
      'likes': blog.likes + 1,
      'author':blog.author,
      'title':blog.title,
      'url':blog.url
    }
    await updateBlog(blog.id, newBlog)
  }

  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog)
    }
  }

  console.log('blog.user.id:', blog.user.id)
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
        <button onClick = {increaseLike} className='like'>like</button>
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