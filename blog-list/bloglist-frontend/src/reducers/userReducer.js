import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'userData',
  initialState: { user:null, username:'', password:'' },
  reducers: {
    setUsername(state, action) {
      return { ...state, username:action.payload }
    },
    setPassword(state, action) {
      return { ...state, password:action.payload }
    },
    setUser(state, action) {
      return { ...state, user:action.payload }
    }
  },
})

export const { setUsername, setPassword, setUser } = userSlice.actions
export default userSlice.reducer

export const login = (username, password) => {
  console.log('logging in with: ', username, password)
  return async dispatch => {

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      console.log('user in reducer: ', user)
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5, 'danger'))
    }
  }
}