import React from 'react'
import IconNav from '../../components/IconNav'
import LoadingBar from 'react-redux-loading-bar'

import Alert from 'react-s-alert'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'

import 'react-select/dist/react-select.css'

export const CoreLayout = ({ children }) => {
  const isLogin = /^\/login\/?\??/i.test(location.pathname)
  return (
    <div className='with-iconav'>
      <Alert stack={{limit: 3}} />
      <LoadingBar style={{position: 'fixed', top: 0, left: 0, backgroundColor: '#009dc7', zIndex: 9999, height: 5}} />
      {(!isLogin) && <IconNav />}
      <div className='container-fluid'>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
