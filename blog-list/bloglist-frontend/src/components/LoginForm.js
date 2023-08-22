import { useDispatch } from 'react-redux'
import { login, setPassword, setUsername } from '../reducers/userReducer'
import { Table, Form, Button } from 'react-bootstrap'
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
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id = 'usename'
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id = 'password'
            />
            <Button variant="primary" type="submit" id="login-button">
            login
            </Button>
          </Form.Group>
        </Form>
      </div>
      <br></br>
    </Togglable>
  )
}

export default LoginForm