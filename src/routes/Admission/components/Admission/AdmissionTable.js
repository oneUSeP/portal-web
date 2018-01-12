import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import PropTypes from 'prop-types'
import AdmissionModal from './AdmissionModal'
import getData from 'utils/pagination'
import renderHTML from 'react-render-html'

class AdmissionTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: props.page || 1,
      count: props.count || 99,
      delete: false,
      selectedRecord: null,
      openModal: false
    }
  }

  handlePaginationClick = (type) => {
    let { page, count } = this.state
    if (type === 'prev') {
      if (page === 1) {
        return
      }
      page -= 1
    } else {
      let { admissions } = this.props
      if (admissions) {
        var data = admissions.get('data')
      }
      if (data.length === 0) {
        return
      }
      page += 1
    }
    this.props.getAdmissions(page, count, Array.from(this.props.filters))
    this.setState({page})
    this.props.updatePage(page)
  }

  handleClick = (data) => {
    this.setState({selectedRecord: data, openModal: true})
  }

  handleModalClose = () => {
    this.setState({selectedRecord: null, openModal: false})
  }

  renderNumberedPages = (page, lastPage) => {
    let prev5 = page - 5

    if (page && lastPage) {
      var list = ''
      for (let i = page; i <= lastPage; i++) {
        if (i == page) {
          list += `<li className=${i == page ? 'active' : ''}><a href=''>${i}</a></li>`
        }
      }
      return renderHTML(list)
    }
  }

  render () {
    let { admissions, fetchingAdmissions, ayterms,
      campuses, civilstatuses, incomebrackets, strands,
      testingcenters, tracks, interviews, scheds } = this.props
    if (admissions) {
      var page = admissions.get('page')
      var lastPage = admissions.get('lastPage')
    }
    var admissionsData = getData(admissions)
    var civilStatusesData = getData(civilstatuses)
    var incomeBracketsData = getData(incomebrackets)
    var aYTermsData = getData(ayterms)
    var strandsData = getData(strands)
    var testingCentersData = getData(testingcenters)
    var tracksData = getData(tracks)
    var campusesData = getData(campuses)
    var interviewsData = getData(interviews)
    var testingSchedsData = getData(scheds)

    return (
      <div className='w-full m-x-auto'>
        <AdmissionModal testingSchedsData={testingSchedsData} campusesData={campusesData} civilStatusesData={civilStatusesData} incomeBracketsData={incomeBracketsData} aYTermsData={aYTermsData} strandsData={strandsData} testingCentersData={testingCentersData} tracksData={tracksData} selectedRecord={this.state.selectedRecord} open={this.state.openModal} closeModal={e => { this.handleModalClose() }} {...this.props} />
        <div className='table-full'>
          <div className='table-responsive'>
            <div className='text-center'>
              <ul className='pagination'>
                <li>
                  <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || fetchingAdmissions || this.props.isSearch})}} >
                    <span aria-hidden='true'>&laquo;</span>
                  </a>
                </li>
                {this.renderNumberedPages(page, lastPage)}
                <li>
                  <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (admissionsData && admissionsData.size === 0) || fetchingAdmissions || this.props.isSearch})}} >
                    <span aria-hidden='true'>&raquo;</span>
                  </a>
                </li>
              </ul>
            </div>
            <table className='table' data-sort='table'>
              <thead>
                <tr>
                  <th className='header'>Full Name</th>
                  <th className='header'>Schedule</th>
                  <th className='header'>Requirements</th>
                  <th className='header'>Email</th>
                  <th className='header'>Contact Number</th>
                  <th className='header'>Average Grade</th>
                  <th className='header'>Academic Year Applied</th>
                  <th className='header'>Testing Center</th>
                  <th className='header'>Registration Date</th>
                  <th className='header'>Updated At</th>
                </tr>
              </thead>
              <tbody>
              {admissionsData && (admissionsData.map(admission => {
                return (
                  <tr key={admission.get('AppNo')}>
                    <td><a href='#' onClick={e => { this.handleClick(admission) }}>{admission.get('LastName')}, {admission.get('FirstName')} {admission.get('MiddleName')}</a></td>
                    <td>{admission.get('TestingSchedID') && admission.get('TestingSchedID') != 0 ? testingSchedsData && testingSchedsData.map(sched => {
                      if (admission.get('TestingSchedID') == sched.get('IndexID')) {
                        return `${sched.get('BatchName')}  | ${moment.utc(sched.get('TestingDate')).format('MMMM Do YYYY')}  | ${moment.utc(sched.get('TimeFrom')).format('h:mm A')} - ${moment.utc(sched.get('TimeTo')).format('h:mm A')} `
                      }
                    }) : 'Not yet'}</td>
                    <td>{admission.get('is_reqcomplete') && admission.get('is_reqcomplete') == true ? <button type='button' className='btn btn-xs btn-pill btn-success'>Complete</button> : <button type='button' className='btn btn-xs btn-pill btn-default'>Incomplete</button>}</td>
                    <td>{admission.get('Email')}</td>
                    <td>{admission.get('TelNo')}</td>
                    <td>{((admission.get('Grade_9') + admission.get('Grade_10') + admission.get('Grade_11') + admission.get('Grade_12')) / 4 > 99 ? 'Invalid' : (admission.get('Grade_9') + admission.get('Grade_10') + admission.get('Grade_11') + admission.get('Grade_12')) / 4)}</td>
                    <td>{aYTermsData && aYTermsData.map((term, i) => {
                      return term.get('TermID') === admission.get('TermID') ? term.get('AcademicYear') + ' - ' + term.get('SchoolTerm') : null
                    })}</td>
                    <td>{testingCentersData && testingCentersData.map((center, i) => {
                      return center.get('TC_ID') === admission.get('ES_Test_Center') ? center.get('TC_Name') : null
                    })}</td>
                    <td>{moment.utc(admission.get('AppDate')).format('MMM. D, YYYY')}</td>
                    <td>{admission.get('updated_at') ? moment.utc(admission.get('updated_at')).format('MMM. D, YYYY hh:mm:ss A') : null}</td>
                  </tr>
                )
              }))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='text-center'>
          <ul className='pagination'>
            <li>
              <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || fetchingAdmissions || this.props.isSearch})}} >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            {this.renderNumberedPages(page, lastPage)}
            <li>
              <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (admissionsData && admissionsData.size === 0) || fetchingAdmissions || this.props.isSearch})}} >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

AdmissionTable.propTypes = {

}

export default AdmissionTable
