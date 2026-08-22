import { forwardRef, useImperativeHandle, useState } from 'react'

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
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={{ display: visible ? '' : 'none' }}>
        {children}
         {/* shows the nested elements within Togglable */}
        <button onClick={toggleVisibility}>hide form</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable