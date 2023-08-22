import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  if (message === null) {
    return null
  }
  return (
    /*
    <div className={type}>
      {message}
    </div>
    */
    <div className="container">
      {(message &&
      <Alert variant={type}>
        {message}
      </Alert>
      )}
    </div>
  )
}

export default Notification