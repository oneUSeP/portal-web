import React from 'react'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'

import 'react-select/dist/react-select.css'

export const CoreLayout = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
