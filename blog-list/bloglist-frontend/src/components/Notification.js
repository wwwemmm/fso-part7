import { useSelector } from 'react-redux'

const Notification = () => {
  console.log('Notification is running...')
  const message = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)
  console.log('Noti.message: ', message)
  if (message === null) {
    return null
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification