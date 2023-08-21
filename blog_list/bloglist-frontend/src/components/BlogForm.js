import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async  (event) => {
    event.preventDefault()
    console.log('adding a new blog', title, author)
    await createBlog(
      {
        'title':title,
        'author':author,
        'url':url
      })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>title:
        <input value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='write blog title here'
        />
      </div>
      <div>author:
        <input value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='write blog author here'
        />
      </div>
      <div>url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='write blog url here'
        />
      </div>
      <button id="summit-blog-button" type="submit">create</button>
    </form>
  )}

export default BlogForm