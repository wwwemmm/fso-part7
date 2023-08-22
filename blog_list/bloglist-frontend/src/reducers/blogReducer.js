import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const toUpdateBlog = action.payload
      let updatedState =  state.map(blog =>
        blog.id !== toUpdateBlog.id ? blog : toUpdateBlog
      )
      return updatedState.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      console.log('appendBlog is running...')
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { updateBlog, appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async dispatch => {
    const  blogs= await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog({
      ...newBlog,
      user: blog.user
    }))
  }
}

export const increadLike= blog => {
  return async dispatch => {
    const changedBlog = {
      ...blog,
      likes:blog.likes + 1
    }
    const newBlog = await blogService.update(changedBlog)
    dispatch(updateBlog(newBlog))
  }
}