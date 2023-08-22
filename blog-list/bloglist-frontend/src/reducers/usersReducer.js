import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import { useSelector } from 'react-redux'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    updateBlogInUser(state, action) {
      console.log(action.payload)
      const toUpdateBlog = action.payload
      console.log('toUpdateBlog.user.id', toUpdateBlog.user.id)
      const afterUpdateBlogs = state.map(u =>
        u.id === toUpdateBlog.user.id?
          { ...u, blogs: u.blogs.filter(b => b.id !== toUpdateBlog.id).concat(toUpdateBlog) }
          : u
      )
      return afterUpdateBlogs.sort((a, b) => b.blogs.length - a.blogs.length)
    },

    appendBlogInUser(state, action) {
      console.log('appendBlogInUser: ', action.payload)
      const user = action.payload.user
      const newBlog = action.payload.blog

      return (
        state.map(u => (
          u.id === user.id?
            { ...u, blogs: u.blogs.concat(newBlog) }
            : u
        ))
      )
    },

    setUsers(state, action) {
      return action.payload
    },

    deleteBlogInUser(state, action) {
      console.log(action.payload)
      const toDeleteBlog = action.payload
      const afterDeleteBlogs = state.map(u =>
        ({
          ...u,
          blogs : u.blogs.filter(b => b.id !== toDeleteBlog.id)
        })
      )
      return afterDeleteBlogs.sort((a, b) => b.blogs.length - a.blogs.length)
    }
  },
})

export const { updateBlog, appendBlogInUser, setUsers, deleteBlogInUser } = usersSlice.actions
export default usersSlice.reducer

export const initializeUsers = () => {
  return async dispatch => {
    const  users= await usersService.getAll()
    const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length)
    dispatch(setUsers(sortedUsers))
  }
}