import { connect } from 'react-redux'

import Account from '../components/Account'

import {getAccounts} from 'store/modules/account'

const mapActionCreators = {
  getAccounts
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  accounts: state.account.get('accounts'),
  fetchingAccounts: state.account.get('fetchingAccounts'),
  fetchAccountsError: state.account.get('fetchAccountsError'),
  fetchingAccountsSuccess: state.account.get('fetchingAccountsSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Account)

