import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput (data) {
  let errors = {}

  if (Validator.isNull(data.appNo)) {
    errors.appNo = 'App No is required'
  }

  if (Validator.isNull(data.lastName)) {
    errors.lastName = 'Last Name is required'
  }

  if (Validator.isNull(data.firstName)) {
    errors.firstName = 'First Name is required'
  }

  if (Validator.isNull(data.middleName)) {
    errors.middleName = 'Middle Name is required'
  }

  if (Validator.isNull(data.dateOfBirth)) {
    errors.dateOfBirth = 'Date of Birth is required'
  }

  if (Validator.isNull(data.gender)) {
    errors.gender = 'Gender is required'
  }

  if (Validator.isNull(data.civilStatusId)) {
    errors.civilStatusId = 'Status is required'
  }

  if (Validator.isNull(data.resBarangay)) {
    errors.appNo = 'House Address is required'
  }

  if (Validator.isNull(data.email)) {
    errors.email = 'Email is required'
  }

  if (Validator.isNull(data.termId)) {
    errors.termId = 'Academic Year Applied is required'
  }

  if (Validator.isNull(data.trackId)) {
    errors.trackId = 'Track is required'
  }

  if (Validator.isNull(data.strandId)) {
    errors.strandId = 'Track Strand is required'
  }

  if (Validator.isNull(data.grade9)) {
    errors.grade9 = 'Grade 9 GPA is required'
  }

  if (Validator.isNull(data.grade10)) {
    errors.grade10 = 'Grade 10 GPA is required'
  }

  if (Validator.isNull(data.grade11)) {
    errors.grade11 = 'Grade 11 GPA is required'
  }

  if (Validator.isNull(data.grade12)) {
    errors.grade12 = 'Grade 12 GPA is required'
  }

  if (Validator.isNull(data.testingCenter)) {
    errors.testingCenter = 'Testing Center is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
