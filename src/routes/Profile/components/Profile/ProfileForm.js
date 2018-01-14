import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import DatePickerGroup from 'components/common/DatePickerGroup'
import ReactSelect from 'components/common/ReactSelect'
import SweetAlert from 'react-bootstrap-sweetalert'
import _ from 'lodash'
import moment from 'moment'

class ProfileForm extends Component {

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

  onSubmit = () => {
    // e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ appNo: '',
        lastName: '',
        firstName: '',
        middleName: '',
        dateOfBirth: '',
        gender: '',
        civilStatusId: '',
        resBarangay: '',
        resTownCity: '',
        email: '',
        telNo: '',
        termId: '',
        choice1CampusId: '',
        choice1Course: '',
        choice1CourseMajor: '',
        choice2CampusId: '',
        choice2Course: '',
        choice2CourseMajor: '',
        choice3CampusId: '',
        choice3Course: '',
        choice3CourseMajor: '',
        father: '',
        fatherOccupation: '',
        fatherIncome: '',
        mother: '',
        motherOccupation: '',
        motherIncome: '',
        emergencyContact: '',
        emergencyRelation: '',
        emergencyAddress: '',
        emergencyTelNo: '',
        elemSchool: '',
        elemAddress: '',
        elemInclDates: '',
        hsSchool: '',
        hsAddress: '',
        hsInclDates: '',
        collegeSchool: '',
        collegeAddress: '',
        collegeInclDates: '',
        trackId: '',
        strandId: '',
        otherStrand: '',
        grade9: '',
        grade10: '',
        grade11: '',
        grade12: '',
        testingCenter: '',
        testingSched: '',
        active: '0',
        errors: {},
        delete: false,
        isLoading: true,
        isUpdated: false,
        isReqComplete: false,
        isSched: false,
        verify: null })
      if (this.props.selectedRecord) {
        this.props.updateAdmission(data)
        this.props.closeModal()
      } else {
        // this.props.createTrack(data)
      }
    } else {
      this.setState({verify: null})
    }
  }

  render () {
    return (
      <form className='form-access' >
        {this.state.verify}
        <ModalBody>
          <div className='row text-center m-t-md'>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>PERSONAL INFORMATION</strong>
                <div className='form-group row'>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.lastName}
                    field='lastName'
                    placeholder='Last Name'
                    error={this.state.errors.lastName}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.firstName}
                    field='firstName'
                    placeholder='First Name'
                    error={this.state.errors.firstName}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.middleName}
                    field='middleName'
                    placeholder='Middle Name'
                    error={this.state.errors.middleName}
                  />
                  <DatePickerGroup
                    field='dateOfBirth'
                    value={this.state.dateOfBirth}
                    placeholder='Birthday'
                    onChange={this.onChangeDate}
                    error={this.state.errors.dateOfBirth}
                  />
                  <ReactSelect
                    value={this.state.gender}
                    onChange={this.handleSelectChange}
                    options={genderOptions}
                    error={this.state.errors.gender}
                    placeholder={'Gender'} />
                  <ReactSelect
                    value={this.state.civilStatusId}
                    onChange={this.handleSelectChange}
                    options={csOptions}
                    error={this.state.errors.civilStatusId}
                    placeholder={'Status'} />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.resBarangay}
                    field='resBarangay'
                    placeholder='House Address'
                    error={this.state.errors.resBarangay}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.resTownCity}
                    field='resTownCity'
                    placeholder='Alternate Address'
                    error={this.state.errors.resTownCity}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.email}
                    field='email'
                    placeholder='Email'
                    error={this.state.errors.email}
                />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.telNo}
                    field='telNo'
                    placeholder='Contact Number'
                    error={this.state.errors.telNo}
                  />
                  <ReactSelect
                    value={this.state.termId}
                    onChange={this.handleSelectChange}
                    options={aytOptions}
                    error={this.state.errors.termId}
                    placeholder={'Academic Year'} />
                </div>
              </div>
            </div>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>COURSE PREFERENCES</strong>
                <div className='form-group row'>
                  <strong className='text-muted'>PREFERENCE 1</strong>
                  <ReactSelect
                    value={this.state.choice1CampusId}
                    onChange={this.handleSelectChange}
                    options={c1Options}
                    error={this.state.errors.choice1CampusId}
                    placeholder={'Campus'}
                    disabled />
                  <TextFieldGroup
                    disabled
                    onChange={this.onChange}
                    value={this.state.choice1Course}
                    field='choice1Course'
                    placeholder='Course'
                    error={this.state.errors.choice1Course}
                  />
                  <TextFieldGroup
                    disabled
                    onChange={this.onChange}
                    value={this.state.choice1CourseMajor}
                    field='choice1CourseMajor'
                    placeholder='Major'
                    error={this.state.errors.choice1CourseMajor}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>PREFERENCE 2</strong>
                  <ReactSelect
                    value={this.state.choice2CampusId}
                    onChange={this.handleSelectChange}
                    options={c2Options}
                    error={this.state.errors.choice2CampusId}
                    placeholder={'Campus'}
                    disabled />
                  <TextFieldGroup
                    disabled
                    onChange={this.onChange}
                    value={this.state.choice2Course}
                    field='choice2Course'
                    placeholder='Course'
                    error={this.state.errors.choice2Course}
                  />
                  <TextFieldGroup
                    disabled
                    onChange={this.onChange}
                    value={this.state.choice2CourseMajor}
                    field='choice2CourseMajor'
                    placeholder='Major'
                    error={this.state.errors.choice2CourseMajor}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>PREFERENCE 2</strong>
                  <ReactSelect
                    value={this.state.choice3CampusId}
                    onChange={this.handleSelectChange}
                    options={c3Options}
                    error={this.state.errors.choice3CampusId}
                    placeholder={'Campus'}
                    disabled />
                  <TextFieldGroup
                    disabled
                    onChange={this.onChange}
                    value={this.state.choice3Course}
                    field='choice3Course'
                    placeholder='Course'
                    error={this.state.errors.choice3Course}
                  />
                  <TextFieldGroup
                    disabled
                    onChange={this.onChange}
                    value={this.state.choice3CourseMajor}
                    field='choice3CourseMajor'
                    placeholder='Major'
                    error={this.state.errors.choice3CourseMajor}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className='m-t-0 m-b-md' />
          <div className='row text-center m-t-md'>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>FAMILY BACKGROUND</strong>
                <div className='form-group row'>
                  <strong className='text-muted'>FATHER</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.father}
                    field='father'
                    placeholder='Father/Guardian Name'
                    error={this.state.errors.father}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.fatherOccupation}
                    field='fatherOccupation'
                    placeholder='Father/Guardian Occupation'
                    error={this.state.errors.fatherOccupation}
                    />
                  <ReactSelect
                    value={this.state.fatherIncome}
                    onChange={this.handleSelectChange}
                    options={faibOptions}
                    error={this.state.errors.fatherIncome}
                    placeholder={'Father`s Annual Income'} />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>MOTHER</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.mother}
                    field='mother'
                    placeholder='Mother`s Name'
                    error={this.state.errors.mother}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.motherOccupation}
                    field='motherOccupation'
                    placeholder='Mother`s Occupation'
                    error={this.state.errors.motherOccupation}
                    />
                  <ReactSelect
                    value={this.state.motherIncome}
                    onChange={this.handleSelectChange}
                    options={maibOptions}
                    error={this.state.errors.motherIncome}
                    placeholder={'Mother`s Annual Income'} />
                </div>
              </div>
            </div>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>PERSON TO CONTACT IN CASE OF EMERGENCY</strong>
                <div className='form-group row'>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.emergencyContact}
                    field='emergencyContact'
                    placeholder='Name'
                    error={this.state.errors.emergencyContact}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.emergencyRelation}
                    field='emergencyRelation'
                    placeholder='Emergency Relation'
                    error={this.state.errors.emergencyRelation}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.emergencyAddress}
                    field='emergencyAddress'
                    placeholder='Address'
                    error={this.state.errors.emergencyAddress}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.emergencyTelNo}
                    field='emergencyTelNo'
                    placeholder='Contact Number'
                    error={this.state.errors.emergencyTelNo}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className='m-t-0 m-b-md' />
          <div className='row text-center m-t-md'>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>EDUCATION BACKGROUND</strong>
                <div className='form-group row'>
                  <strong className='text-muted'>ELEMENTARY</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.elemSchool}
                    field='elemSchool'
                    placeholder='Elementary School'
                    error={this.state.errors.elemSchool}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.elemAddress}
                    field='elemAddress'
                    placeholder='Adress'
                    error={this.state.errors.elemAddress}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.elemInclDates}
                    field='elemInclDates'
                    placeholder='Year Graduated'
                    error={this.state.errors.elemInclDates}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>JR. HIGH</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.hsSchool}
                    field='hsSchool'
                    placeholder='Jr. High School'
                    error={this.state.errors.hsSchool}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.hsAddress}
                    field='hsAddress'
                    placeholder='Adress'
                    error={this.state.errors.hsAddress}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.hsInclDates}
                    field='hsInclDates'
                    placeholder='Year Graduated'
                    error={this.state.errors.hsInclDates}
                  />
                </div>
                <div className='form-group row'>
                  <strong className='text-muted'>SR. HIGH</strong>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.collegeSchool}
                    field='collegeSchool'
                    placeholder='Sr. High School'
                    error={this.state.errors.collegeSchool}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.collegeAddress}
                    field='collegeAddress'
                    placeholder='Address'
                    error={this.state.errors.collegeAddress}
                    />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.collegeInclDates}
                    field='collegeInclDates'
                    placeholder='Year Graduated'
                    error={this.state.errors.collegeInclDates}
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-6 m-b-md'>
              <div className='w-lg m-x-auto'>
                <strong className='text-muted'>SCHOLASTIC BACKGROUND</strong>
                <div className='form-group row'>
                  <ReactSelect
                    value={this.state.trackId}
                    onChange={this.handleSelectChange}
                    options={tOptions}
                    error={this.state.errors.trackId}
                    placeholder={'Track'} />
                  <ReactSelect
                    value={this.state.strandId}
                    onChange={this.handleSelectChange}
                    options={sOptions}
                    error={this.state.errors.strandId}
                    placeholder={'Strand'} />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.otherStrand}
                    field='otherStrand'
                    placeholder='Other Strand'
                    error={this.state.errors.otherStrand}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.grade9}
                    field='grade9'
                    placeholder='Grade 9'
                    error={this.state.errors.grade9}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.grade10}
                    field='grade10'
                    placeholder='Grade 10'
                    error={this.state.errors.grade10}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.grade11}
                    field='grade11'
                    placeholder='Grade 11'
                    error={this.state.errors.grade11}
                  />
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.grade12}
                    field='grade12'
                    placeholder='Grade 12'
                    error={this.state.errors.grade12}
                  />
                  <div className='form-group'>
                    <div>
                      <div className='radio-inline custom-control custom-radio'>
                        <label>
                          <input type='radio' id='radio1' name='radio_req' checked={this.state.isReqComplete} onClick={e => { this.setState({isReqComplete: true}) }} />
                          <span className='custom-control-indicator'></span>
                          Complete
                        </label>
                      </div>
                      <div className='radio-inline custom-control custom-radio'>
                        <label>
                          <input type='radio' id='radio2' name='radio_req' checked={!this.state.isReqComplete} onClick={e => { this.setState({isReqComplete: false}) }} />
                          <span className='custom-control-indicator'></span>
                          Incomplete
                        </label>
                      </div>
                    </div>
                    <span className='statcard-desc'>Requirements</span>
                  </div>
                  {this.state.isSched ? (<div className='form-group'>
                    <ReactSelect
                      value={this.state.testingSched}
                      onChange={this.handleSelectChange}
                      options={tS}
                      error={this.state.errors.testingSched}
                      placeholder={'Testing Schedules'} />
                  </div>) : null}
                  <div className='form-group'>
                    <div>
                      <div className='radio-inline custom-control custom-radio'>
                        <label>
                          <input type='radio' id='radio3' name='radio_sched' checked={this.state.isSched} onClick={e => { this.setState({isSched: true}) }} />
                          <span className='custom-control-indicator'></span>
                          Yes
                        </label>
                      </div>
                      <div className='radio-inline custom-control custom-radio'>
                        <label>
                          <input type='radio' id='radio4' name='radio_sched' checked={!this.state.isSched} onClick={e => { this.setState({isSched: false, testingSched: 0}) }} />
                          <span className='custom-control-indicator'></span>
                          No
                        </label>
                      </div>
                    </div>
                    <span className='statcard-desc'>Schedule Test</span>
                  </div>
                  <div className='form-group'>
                    <ReactSelect
                      value={this.state.testingCenter}
                      onChange={this.handleSelectChange}
                      options={t1}
                      error={this.state.errors.testingCenter}
                      placeholder={'Testing Center'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type='button' className='btn btn-md btn-pill btn-primary' onClick={e => {
            this.setState({verify: <SweetAlert
              warning
              showCancel
              confirmBtnText='Yes, update record!'
              confirmBtnBsStyle='warning'
              cancelBtnBsStyle='default'
              title='Are you sure?'
              onConfirm={e => { this.onSubmit() }}
              onCancel={e => { this.setState({verify: null}) }}
            >
            You are about to update a record. Please review your changes.
            </SweetAlert>})
          }}>Save</button>
        </ModalFooter>
      </form>
    )
  }
}

ProfileForm.propTypes = {

}

export default ProfileForm
