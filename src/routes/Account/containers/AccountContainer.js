import { connect } from 'react-redux'

import Account from '../components/Account'

const mapActionCreators = {

}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapActionCreators)(Account)

