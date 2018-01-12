import React, { Component } from 'react'
import AdmissionForm from './AdmissionForm'
import SweetAlert from 'react-bootstrap-sweetalert'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'

import Alert from 'react-s-alert'

class AdmissionModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      delete: null,
      page: 1,
      count: 99
    }
  }

  handleDeletingSuccess = () => {
    this.setState({deleteSuccess: null, delete: null})
    this.hideModal()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.deletingAdmissionSuccess) {
      let {page, count} = this.state
      this.setState({
        deleteSuccess: (<SweetAlert success title='Success!' onConfirm={e => { this.handleDeletingSuccess() }}>
        Record deleted.
        </SweetAlert>)
      })
      this.props.getAdmissions(page, count, Array.from(nextProps.filters))
    }
  }

  hideModal = () => {
    this.props.closeModal()
  }

  handleDeleteConfirm = () => {
    this.props.deleteAdmission(this.props.selectedRecord.get('AppNo'))
  }
  handleDelete = () => {
    this.setState({delete: <SweetAlert
      warning
      showCancel
      confirmBtnText='Yes, delete it!'
      confirmBtnBsStyle='danger'
      cancelBtnBsStyle='default'
      title='Are you sure?'
      onConfirm={this.handleDeleteConfirm}
      onCancel={e => this.setState({delete: null})}
      >
      You will not be able to recover this admission record!
      </SweetAlert>})
  }

  render () {
    return (
      <Modal isOpen={this.props.open} size='modal-lg' onRequestHide={this.hideModal}>
        <Alert stack={{limit: 3}} />
        {this.state.delete}
        {this.state.deleteSuccess}
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle >Update Record {this.props.selectedRecord && this.props.selectedRecord.get('AppNo')} <button type='button' onClick={e => { this.handleDelete() }} className='btn btn btn-pill btn-danger'>DELETE</button></ModalTitle>
        </ModalHeader>
        <AdmissionForm {...this.props} />
      </Modal>
    )
  }
}

AdmissionModal.propTypes = {

}

export default AdmissionModal
