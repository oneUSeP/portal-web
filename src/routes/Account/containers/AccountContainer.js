import { connect } from 'react-redux'

import Account from '../components/Account'

import {getAccounts} from 'store/modules/account'

const mapActionCreators = {
  getAccounts
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  accounts: state.student.get('accounts'),
  fetchingAccount: state.student.get('fetchingAccount'),
  fetchAccountError: state.student.get('fetchAccountError'),
  fetchingAccountSuccess: state.student.get('fetchingAccountSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Account)

