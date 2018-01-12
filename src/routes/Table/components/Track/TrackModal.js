import React, { Component } from 'react'
import TrackCreateForm from './TrackCreateForm'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'

class TrackModal extends Component {

  hideModal = () => {
    this.props.closeModal()
  }

  render () {
    return (
      <Modal isOpen={this.props.open} onRequestHide={this.hideModal}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle >{this.props.selectedTrack ? 'Update' : 'Create'} Track</ModalTitle>
        </ModalHeader>
        <TrackCreateForm {...this.props} />
      </Modal>
    )
  }
}

TrackModal.propTypes = {

}

export default TrackModal
