import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import createBlogReducer from './reducers/createBlogReducer'
import usersReducer from './reducers/usersReducer'

import {
  BrowserRouter as Router
} from 'react-router-dom'

const store = configureStore({
  reducer :{
    notification: notificationReducer,
    userData: userReducer,
    blogs: blogReducer,
    createBlog:createBlogReducer,
    users:usersReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)