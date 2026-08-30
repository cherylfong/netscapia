import { Alert } from '@mui/material'

// notification object has the fields
// 1. type - determines the color of the notification
// 2. text - the notification message
const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (

    <Alert className="error"
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={notification.type}>
      {notification.text}
    </Alert>
  )
}

export default Notification