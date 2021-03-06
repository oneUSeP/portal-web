import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GradesTable from './GradesTable'
import moment from 'moment'
import {Button} from 'antd'

class Grade extends Component {
  state = {
    gradesData: null,
    summaryData: null
  }

  componentWillReceiveProps (nextProps) {
    let termId = nextProps.params.termId
    let user = this.props.auth.get('user')
    let { ayterms, fetchingAyTermsSuccess, extraDetails, fetchingGradesSuccess, grades } = nextProps

    if ((this.props.params.termId && this.props.params.termId != nextProps.params.termId)) {
      if (ayterms && extraDetails && user) {
        this.props.getGrades(user.get('username'), termId, extraDetails.get('ProgClass'))
      }
    }

    if (fetchingAyTermsSuccess) {
      if (ayterms && extraDetails && user) {
        this.props.getGrades(user.get('username'), termId, extraDetails.get('ProgClass'))
      }
    }

    if (nextProps.fetchingGradesSuccess) {
      let data = nextProps.grades.get('grades')
      let summary = nextProps.grades.get('summary')

      let dataSource = []
      let summarySource = []
      if (summary) {
        summary.map(value => {
          summarySource = {
            enrolled: value.get('enrolled'),
            earned: value.get('earned'),
            gwa: value.get('gwa'),
            cqpa1: value.get('cqpa1'),
            cqpa2: value.get('cqpa2')
          }
        })
      }
      data.map(grade => {
        dataSource.push({
          code: grade.get('Subject'),
          title: grade.get('Title'),
          unit: grade.get('Unit'),
          midterm: grade.get('Midterm'),
          final: grade.get('Final'),
          reExam: grade.get('ReExam'),
          remarks: grade.get('GradeRemarks'),
          midtermGradeDatePosted: grade.get('MidtermGradesPostingDate') ? moment.utc(grade.get('MidtermGradesPostingDate')).format('ddd, MMM DD YYYY') : null,
          finalGradeDatePosted: grade.get('DatePosted') ? moment.utc(grade.get('DatePosted')).format('ddd, MMM DD YYYY') : null
        })
      })
      this.setState({gradesData: dataSource, summaryData: summarySource})
    }
  }

  render () {
    return (
      <div>
      {/* <div style={{ marginBottom: 16 }}>
        <Button icon="printer" type='primary'>Print</Button>
      </div> */}
        <GradesTable data={this.state.gradesData ? this.state.gradesData : []} summary={this.state.summaryData ? this.state.summaryData : []} {...this.props} />
      </div>
    )
  }
}

Grade.propTypes = {

}

export default Grade
