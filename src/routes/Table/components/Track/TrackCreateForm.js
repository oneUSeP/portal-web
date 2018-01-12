import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import validateInput from 'utils/validators/track'
import SweetAlert from 'react-bootstrap-sweetalert'

import {ModalBody,
  ModalFooter,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton } from 'react-bootstrap'

class TrackCreateForm extends Component {
  state = {
    id: '',
    trackName: '',
    active: '0',
    errors: [],
    delete: false,
    isLoading: false
  }

  componentWillReceiveProps (nextProps) {
    let { selectedTrack } = nextProps

    if (selectedTrack && selectedTrack != null) {
      this.setState({
        id: '' + selectedTrack.get('track_id') || '',
        trackName: selectedTrack.get('track_name') || '',
        active: selectedTrack.get('is_active') != '0'
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ id: '', trackName: '',
        active: '0',
        errors: {}, isLoading: true })
      if (this.props.selectedTrack) {
        this.props.updateTrack(data)
      } else {
        this.props.createTrack(data)
      }
    }
  }

  handleDelete = (id) => {
    this.setState({delete: (<SweetAlert
      warning
      showCancel
      confirmBtnText='Yes, delete it!'
      confirmBtnBsStyle='danger'
      cancelBtnBsStyle='default'
      title='Are you sure?'
      onConfirm={this.handleDeleteAction}
      onCancel={e => { this.setState({delete: null}) }}
    >
    You will not be able to recover this record!
    </SweetAlert>)})
  }

  handleDeleteAction = () => {
    this.setState({delete: null})
    this.props.deleteTrack(this.state.id)
  }

  render () {
    return (
      <form className='form-access' >
        {this.state.delete}
        <ModalBody>
        <div className='row text-center m-t-md'>
            <div className='col-sm-12 m-b-md'>
              <div className='w-lg m-x-auto'>
                <div className='form-group row'>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.trackName}
                    field='trackName'
                    placeholder='Track Name'
                    error={this.state.errors.trackName}
                    />
                </div>
                <div className='form-group row'>
                  <div>
                    <div className='radio-inline custom-control custom-radio'>
                      <label>
                        <input type='radio' id='radio5' name='radio_active' checked={this.state.active == '1'} onClick={e => { this.setState({active: '1'}) }} />
                        <span className='custom-control-indicator'></span>
                        Yes
                      </label>
                    </div>
                    <div className='radio-inline custom-control custom-radio'>
                      <label>
                        <input type='radio' id='radio6' name='radio_active' checked={this.state.active == '0'} onClick={e => { this.setState({active: '0'}) }} />
                        <span className='custom-control-indicator'></span>
                        No
                      </label>
                    </div>
                  </div>
                  <span className='statcard-desc'>ACTIVE</span>
                </div>
              </div>
            </div>
        </div>

        </ModalBody>
        <ModalFooter>
          {this.props.selectedTrack && (<button type='button' className='btn btn-md btn-pill btn-danger' onClick={e => { this.handleDelete() }}>Delete</button>)}
          <button type='button' className='btn btn-md btn-pill btn-primary' onClick={this.onSubmit}>Submit</button>
        </ModalFooter>
      </form>
    )
  }
}

TrackCreateForm.propTypes = {

}

export default TrackCreateForm
