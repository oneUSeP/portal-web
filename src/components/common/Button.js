import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import Loading from './Loading'

class Button extends Component {
  render () {
    const { value, className, hidden, disabled } = this.props

    return (
      <center>
        <button
          value={value}
          disabled={disabled}
          className={classnames('btn', className)}
          style={{display: hidden ? 'none' : null}}>
          {value}
        </button>
        <Loading hidden={!hidden} />
      </center>
    )
  }
}

Button.propTypes = {
}

export default Button
