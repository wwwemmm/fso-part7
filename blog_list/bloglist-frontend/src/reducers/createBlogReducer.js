import { createSlice } from '@reduxjs/toolkit'

const createBlogSlice = createSlice({
  name: 'createBlog',
  initialState: { title:'', author:'', url:'' },
  reducers: {
    setTitle(state, action) {
      return { ...state, title:action.payload }
    },
    setAuthor(state, action) {
      return { ...state, author:action.payload }
    },
    setUrl(state, action) {
      return { ...state, url:action.payload }
    },
    resetCreateBlog(state, action) {
      return  { title:'', author:'', url:'' }
    }
  },
})

export const { setTitle, setAuthor, setUrl, resetCreateBlog } = createBlogSlice.actions
export default createBlogSlice.reducer