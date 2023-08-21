import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      console.log('filter state now: ', state)
      console.log('action', action)
      state = action.payload
      // Don't forget return
      return state
    },
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer