import React from 'react'

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
