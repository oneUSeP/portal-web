import React from 'react'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'

export const CoreLayout = ({ children }) => {
  return (
    <div>
      <Alert stack={{limit: 3}} />
      {children}
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
