import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(currentVisible => !currentVisible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }))

  return (
    <div>
      <div style={{ display: visible ? 'none' : '' }}>
        <Button onClick={toggleVisibility} variant='outlined' style={{ marginTop: 10 }}>{buttonLabel}</Button>
      </div>

      <div style={{ display: visible ? '' : 'none' }}>
        {children}
        {/* shows the nested elements within Togglable */}
        <Button onClick={toggleVisibility} variant='outlined' style={{ marginTop: 10 }}>
          hide form
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable