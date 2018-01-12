import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Workbook from 'react-excel-workbook'
import moment from 'moment'
import {getDataToArray} from 'utils/pagination'
import Admission from './Admission'

class AdmissionToExcel extends Component {
  render () {
    let { admissions } = this.props

    var admissionsData = getDataToArray(admissions)
    var data = []
    if (admissionsData) {
      admissionsData.map(admission => {
        data.push({
          LastName: admission.get('LastName'),
          FirstName: admission.get('FirstName'),
          MiddleName: admission.get('MiddleName'),
          Email: admission.get('Email'),
          TelNo: admission.get('TelNo'),
          Grade: (admission.get('Grade_9') + admission.get('Grade_10') + admission.get('Grade_11') + admission.get('Grade_12')) / 4
        })
      })
    }

    return (
      <Workbook filename={`admission-${moment()}.xlsx`} element={<button className='btn btn-xs btn-default-outline'>Export</button>}>
        <Workbook.Sheet data={data} name='Sheet A'>
          <Workbook.Column label='LastName' value='LastName' />
          <Workbook.Column label='FirstName' value='FirstName' />
          <Workbook.Column label='MiddleName' value='MiddleName' />
          <Workbook.Column label='Email' value='Email' />
          <Workbook.Column label='TelNo' value='TelNo' />
          <Workbook.Column label='Grade' value='Grade' />
        </Workbook.Sheet>
      </Workbook>
    )
  }
}

AdmissionToExcel.propTypes = {

}

export default AdmissionToExcel
