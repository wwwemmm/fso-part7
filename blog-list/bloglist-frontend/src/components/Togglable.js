import { useState, forwardRef, useImperativeHandle } from 'react'
import { Table, Form, Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility} id = {props.buttonLabel}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="secondary" size="sm" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
export default Togglable