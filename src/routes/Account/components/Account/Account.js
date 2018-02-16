import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountsTable from './AccountsTable'

class Account extends Component {
  state = {
    accountsData: null
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.fetchingAccountsSuccess) {
      let data = nextProps.accounts.get('data')
      let dataSource = []
      data.map(account => {
        dataSource.push({
          key: account.get('id'),
          username: account.get('username'),
          email: account.get('email'),
          role: account.get('role')
        })
      })
      this.setState({accountsData: dataSource})
    }
  }

  componentWillMount () {
    this.props.getAccounts(1, 99999)
  }

  render () {
    return (
      <div>
        <AccountsTable data={this.state.accountsData ? this.state.accountsData : []} {...this.props} />
      </div>
    )
  }
}

Account.propTypes = {

}

export default Account
