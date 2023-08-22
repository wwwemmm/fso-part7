import { createSlice } from '@reduxjs/toolkit'
import commetService from '../services/comments'
import { updateBlog } from './blogReducer'

const commentSlice = createSlice({
  name: 'comment',
  initialState: '',
  reducers: {
    setComment(state, action) {
      return action.payload
    },
    resetComment(state, action) {
      return ''
    },
  },
})

export const { setComment, resetComment } = commentSlice.actions
export default commentSlice.reducer

export const createComment = (blog, content) => {
  return async dispatch => {
    const comment = await commetService.create({ content, blog:blog.id })
    /* comment
    {
    "content": "hello",
    "blog": "64e462ff82b04040626d72ba",
    "id": "64e4b74f1f6a3d93c0f0721a"
    }*/
    dispatch(resetComment())
    dispatch(updateBlog({
      ...blog,
      comments: blog.comments.concat(comment)
    }))
  }
}