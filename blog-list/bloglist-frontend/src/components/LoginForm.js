import { useDispatch } from 'react-redux'
import { login, setPassword, setUsername } from '../reducers/userReducer'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'

const LoginForm = ({ pros }) => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username =  event.target.username.value
    const password =  event.target.password.value
    console.log('username: ', username)
    dispatch(login(username, password))
  }

  return (
    <Togglable buttonLabel='login'>
      <div>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              name='username'
            />
          </div>
          <div>
          password
            <input
              type="password"
              id='password'
              name='password'
            />
          </div>
          <button id="login-button" type="submit" >login</button>
        </form>
      </div>
    </Togglable>
  )
}

export default LoginForm