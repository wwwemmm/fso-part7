import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import anecdotes from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const toUpdateAnecdote = action.payload
      let updatedState =  state.map(anecdote =>
        anecdote.id !== toUpdateAnecdote.id ? anecdote : toUpdateAnecdote
      )
      return updatedState.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { updateAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const  anecdotes= await anecdoteService.getAll()
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(sortedAnecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const increadVote= anecdote => {
  return async dispatch => {
    const changedAnecdote = { 
      ...anecdote, 
      votes:anecdote.votes + 1
    }
    const newAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}