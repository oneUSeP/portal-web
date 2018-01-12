import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TrackModal from './TrackModal'
import SweetAlert from 'react-bootstrap-sweetalert'

class Track extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 1000,
      delete: false,
      selectedTrack: null,
      openModal: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.deletingTrackSuccess) {
      let {page, count} = this.state
      this.props.getTracks(page, count)
      this.setState({
        selectedTrack: null,
        delete: (
          <SweetAlert success title='Deleted!' onConfirm={e => { this.setState({delete: null, openModal: false}) }}>
            Track has been deleted.
          </SweetAlert>
          )
      })
    }

    if (nextProps.creatingTrackSuccess) {
      let {page, count} = this.state
      this.props.getTracks(page, count)
      this.setState({
        selectedTrack: null,
        openModal: false
      })
    }
  }

  handleClick = (data) => {
    this.setState({selectedTrack: data, openModal: true})
  }

  handleModalClose = () => {
    this.setState({selectedTrack: null, openModal: false})
  }

  render () {
    let { name, data } = this.props
    return (
      <div className='w-full m-x-auto'>
        {this.state.delete}
        <TrackModal selectedTrack={this.state.selectedTrack} open={this.state.openModal} closeModal={e => { this.handleModalClose() }} {...this.props} />
        <div className='list-group' style={{marginTop: '2%'}}>
          <h4 className='list-group-header'>
            <div className='flextable'>
              <div className='flextable-item flextable-primary'>
                {name}
              </div>
              <div className='flextable-item'>
                <div className='btn-group'>
                  <button className='btn btn-primary-outline p-x' style={{textAlign: 'right'}} onClick={e => { this.setState({openModal: true}) }}>Add</button>
                </div>
              </div>
            </div>
          </h4>
          {
            data && data.map((track, i) => {
              return (
                <a className='list-group-item' onClick={e => { this.handleClick(track) }}>
                  <span className='list-group-progress' style={{width: '100%'}}></span>
                  <span className='pull-right text-muted'>{track.get('is_active') ? 'Active' : 'Inactive'}</span>
                  {track.get('track_name')}
                </a>
              )
            })
          }

        </div>
      </div>
    )
  }
}

Track.propTypes = {

}

export default Track
