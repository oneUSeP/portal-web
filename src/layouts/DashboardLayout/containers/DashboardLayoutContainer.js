import { connect } from 'react-redux'

import DashboardLayout from '../components/DashboardLayout'

const mapActionCreators = {

}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapActionCreators)(DashboardLayout)

