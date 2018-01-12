import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SweetAlert from 'react-bootstrap-sweetalert'
import TextFieldGroup from 'components/common/TextFieldGroup'
import _ from 'lodash'
const { List } = require('immutable')
import AdmissionTable from './AdmissionTable'
import AdmissionToExcel from './AdmissionToExcel'
import Alert from 'react-s-alert'
import moment from 'moment'

class Admission extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      alert: null,
      search: '',
      errors: [],
      page: 1,
      count: 99,
      filterReq: '',
      filterUpd: '',
      filterRank: '',
      filterTelNo: '',
      filterEmail: '',
      filterFirstName: '',
      filterLastName: '',
      filters: new Set(),
      isSearch: false
    }
  }

  componentWillMount () {
    let { page, count } = this.state
    this.props.getAdmissions(page, count)
    this.props.getAyTerms(page, 999)
    this.props.getCampuses(page, count)
    this.props.getCivilStatuses(page, count)
    this.props.getIncomeBrackets(page, count)
    this.props.getStrands(page, count)
    this.props.getTracks(page, count)
    this.props.getTestingCenters(page, count)
    this.props.getInterviews(page, 9999)
    this.props.getTestingScheds(page, count)
  }

  componentWillReceiveProps (nextProps) {
    let {page, count, filters} = this.state
    let {fetchingTestingSchedsCountSuccess, schedsCount } = nextProps
    if (fetchingTestingSchedsCountSuccess) {
      var sched = schedsCount.get('sched')
      if (schedsCount.get('count') <= sched.get('Limit')) {
        Alert.success(`<h4>${schedsCount.get('count')} / ${sched.get('Limit')}</h4>${sched.get('BatchName')}<br>${moment.utc(sched.get('TestingDate')).format('MMMM Do YYYY')}<br>${moment.utc(sched.get('TimeFrom')).format('h:mm A')} - ${moment.utc(sched.get('TimeTo')).format('h:mm A')} `, {
          position: 'top-right',
          effect: 'scale',
          html: true
        })
      } else {
        Alert.error(`<h4>${schedsCount.get('count')} / ${sched.get('Limit')}</h4><br>${sched.get('BatchName')}<br>${moment.utc(sched.get('TestingDate')).format('MMMM Do YYYY')}<br>${moment.utc(sched.get('TimeFrom')).format('h:mm A')} - ${moment.utc(sched.get('TimeTo')).format('h:mm A')} `, {
          position: 'top-right',
          effect: 'scale',
          html: true
        })
      }
    }
    if (nextProps.creatingAdmissionSuccess) {
      this.setState({
        updateSuccess: (<SweetAlert success title='Success!' onConfirm={e => { this.setState({updateSuccess: null}) }}>
        Record updated.
        </SweetAlert>)
      })
      this.props.getAdmissions(page, count, Array.from(filters))
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    let {keyword, filterReq, filterUpd, filterRank, filterEmail, filterFirstName, filterLastName, filterTelNo} = this.state
    let filter = []
    if (filterReq) {
      filter.push('is_reqcomplete')
    }
    if (filterUpd) {
      filter.push('updated_at')
    }
    if (filterRank) {
      filter.push('rank')
    }
    if (filterEmail) {
      filter.push('Email')
    }
    if (filterFirstName) {
      filter.push('FirstName')
    }
    if (filterLastName) {
      filter.push('LastName')
    }
    if (filterTelNo) {
      filter.push('TelNo')
    }
    this.setState({isSearch: true})
    this.props.searchAdmissions(keyword, filter)
  }

  handleFilterChange = (e) => {
    let {page, count, filters} = this.state
    var s = filters
    if (e.target.value === 'req') {
      if (e.target.checked) {
        s.add('is_reqcomplete')
        this.setState({filterReq: true, filters: s})
      } else {
        s.delete('is_reqcomplete')
        this.setState({filterReq: false, filters: s})
      }

      this.props.getAdmissions(page, count, Array.from(filters))
    }
    if (e.target.value === 'upd') {
      if (e.target.checked) {
        s.add('updated_at')
        this.setState({filterUpd: true, filters: s})
      } else {
        s.delete('updated_at')
        this.setState({filterUpd: false, filters: s})
      }

      this.props.getAdmissions(page, count, Array.from(filters))
    }
    if (e.target.value === 'rank') {
      if (e.target.checked) {
        s.add('rank')
        this.setState({filterRank: true, filters: s})
      } else {
        s.delete('rank')
        this.setState({filterRank: false, filters: s})
      }

      this.props.getAdmissions(page, count, Array.from(filters))
    }
    if (e.target.value === 'TelNo') {
      if (e.target.checked) {
        this.setState({filterTelNo: true})
      } else {
        this.setState({filterTelNo: false})
      }
    }
    if (e.target.value === 'Email') {
      if (e.target.checked) {
        this.setState({filterEmail: true})
      } else {
        this.setState({filterEmail: false})
      }
    }
    if (e.target.value === 'LastName') {
      if (e.target.checked) {
        this.setState({filterLastName: true})
      } else {
        this.setState({filterLastName: false})
      }
    }
    if (e.target.value === 'FirstName') {
      if (e.target.checked) {
        this.setState({filterFirstName: true})
      } else {
        this.setState({filterFirstName: false})
      }
    }
  }

  updatePage = (value) => {
    this.setState({page: value})
  }

  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '0%'}} >

      {this.state.updateSuccess}
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>USEP-KMSD | Admission's Support Module</h6>
              {/* <h3 className='dashhead-title'>Registered Applicants {<AdmissionToExcel {...this.props} />}</h3> */}
              <h3 className='dashhead-title'>Registered Applicants</h3>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item flextable-primary'>
              <input type='text' className='form-control' onChange={e => { this.setState({keyword: e.target.value}) }} placeholder='Search' />
            </div>
            <div className='flextable-item'>
              <div className='btn-group'>
                <button type='button' className='btn btn-primary-outline' onClick={this.onSubmit}>
                  <span className='icon icon-magnifying-glass'>Search</span>
                </button>
              </div>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item'>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'FirstName'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  First Name
                </label>
              </div>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'LastName'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Last Name
                </label>
              </div>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'Email'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Email
                </label>
              </div>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'TelNo'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Contact Number
                </label>
              </div>
            </div>
            <div className='flextable-item'>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'req'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Complete Requirements
                </label>
              </div>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'upd'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Updated
                </label>
              </div>
            </div>
            {/* <div className='flextable-item'>
              <div className='checkbox-inline custom-control custom-checkbox'>
                <label>
                  <input type='checkbox' value={'rank'} onChange={e => { this.handleFilterChange(e) }} />
                  <span className='custom-control-indicator'></span>
                  Sort By Grade
                </label>
              </div>
            </div> */}
          </div>
        </div>
        <div className='col-sm-12 content'>
          <AdmissionTable updatePage={this.updatePage} page={this.state.page} count={this.state.count} filters={this.state.filters} isSearch={this.state.isSearch} {...this.props} />
        </div>
      </div>
    )
  }
}

Admission.propTypes = {

}

export default Admission
