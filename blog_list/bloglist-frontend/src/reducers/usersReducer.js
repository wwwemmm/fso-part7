import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'


const usersSlice = createSlice({
  name: 'users',
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
    setUsers(state, action) {
      return action.payload
    },

    deleteBlog(state, action) {
      console.log('blogReducer_deleteBlogs is running...')
      const toDeleteBlog = action.payload
      const afterDeleteBlogs = state.filter(b => b.id !== toDeleteBlog.id)
      return afterDeleteBlogs.sort((a, b) => b.likes - a.likes)
    }
  },
})

export const { updateBlog, appendBlog, setUsers, deleteBlog } = usersSlice.actions
export default usersSlice.reducer

export const initializeUsers = () => {
  return async dispatch => {
    const  users= await usersService.getAll()
    const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length)
    dispatch(setUsers(sortedUsers))
  }
}