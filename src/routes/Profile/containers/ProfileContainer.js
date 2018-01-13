import { connect } from 'react-redux'

import Profile from '../components/Profile'

const mapActionCreators = {

}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapActionCreators)(Profile)

