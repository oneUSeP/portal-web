import React, { Component } from 'react'

import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import { Row, Col } from 'antd'

class Home extends Component {
  render () {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <div className='coming-soon' style={{'textAlign': 'center'}}>
              <h1>Coming Soon</h1>
              <p>Nothing to see here, yet.</p>
              <p>Update your profile information <a href='http://portal.usep.edu.ph/dashboard/me'>here. </a></p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

Home.propTypes = {

}

export default Home
