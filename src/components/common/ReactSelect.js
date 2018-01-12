import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import Select from 'react-select'

class ReactSelect extends Component {
  render () {
    const { value, onChange, error, options, placeholder, disabled } = this.props

    return (
      <div className={classnames('form-group', { 'has-error': error })}>
        {error && <small className='help-block text-right'>{error}</small>}
        <Select
          name='form-field-name'
          value={value}
          onChange={onChange}
          options={options}
          disabled={disabled}
        />
        <span className='statcard-desc'>{placeholder}</span>
      </div>
    )
  }
}

ReactSelect.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  inputBlock: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  customClass: PropTypes.string,
  options: PropTypes.arr
}

ReactSelect.defaultProps = {
  type: 'text'
}

export default ReactSelect
