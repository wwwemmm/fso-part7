import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = () => {
  const user = useSelector(state => state.userData.user)
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }
  const handleLogout = () => {
    dispatch(setUser(null))
    console.log('logout: ', user)
    window.localStorage.removeItem('loggedBlogappUser')
  }
  return (
    /*
    <div>
      <Link style={padding} to="/"></Link>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <span>{user.name} logged in</span>
      <button onClick = {handleLogout} >logout</button>
    </div>
    */
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em style={padding}>{user.name} logged in</em>
            <Button variant='secondary' size="sm" onClick = {handleLogout} >logout</Button>

          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu