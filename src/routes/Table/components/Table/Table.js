import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Track from '../Track'
import { Tabs, Tab } from 'react-bootstrap'
import _ from 'lodash'
import cx from 'classnames'

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15
    }
  }

  componentWillMount () {
    let {page, count} = this.state
    this.props.getTracks(page, count)
  }

  handleSelect = (e) => {
    event.preventDefault()
    this.setState({ selectedTab: e })
  }

  render () {
    let { tracks } = this.props
    if (tracks) {
      var tracksData = tracks.get('data')
    }
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD | Admission's Support Module</h6>
              <h3 className='dashhead-title'>Registration Form Fields</h3>
            </div>
          </div>
        </div>
        <div className='w-lg m-x-auto'>
          <Tabs bsStyle='nav nav-bordered' activeKey={this.state.selectedTab || 'track'} onSelect={this.handleSelect} id='controlled-tab-example'>
            {tracksData ? <Tab style={{textAlign: 'left'}} key='track' eventKey='track' title='Tracks'><Track name={'Tracks'} data={tracksData} {...this.props} /></Tab> : null}
            <Tab style={{textAlign: 'left'}} key='strand' eventKey='strand' title='Strands'><Track name={'Strands'} /></Tab>
            <Tab style={{textAlign: 'left'}} key='grade' eventKey='grade' title='Grades'><Track name={'Grades'} /></Tab>
            <Tab style={{textAlign: 'left'}} key='income' eventKey='income' title='Annual Income'><Track name={'Annual Income'} /></Tab>
            <Tab style={{textAlign: 'left'}} key='testing' eventKey='testing' title='Testing Centers'><Track name={'Testing Centers'} /></Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

Table.propTypes = {

}

export default Table
