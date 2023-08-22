import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { 'message':null, 'type':'' },
  reducers: {
    showNotification(state, action) {
      return { 'message':action.payload.message, 'type':action.payload.type }
    },
    removeNotification(state, action) {
      return { 'message':null, 'type':'' }
    },
  },
})

export const { showNotification,removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, time, type) => {
  //console.log('setNotification is runnning...')
  return async dispatch => {
    dispatch(showNotification({ message:message, type:type }))
    setTimeout(function() {
      dispatch(removeNotification(''))
    }, time*1000)
  }
}