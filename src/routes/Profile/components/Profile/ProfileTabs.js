import React, { Component } from 'react'
import { Card } from 'antd'
import 'antd/lib/card/style/css'

const tabList = [{
  key: 'tab1',
  tab: 'Basic Information'
},
{
  key: 'tab2',
  tab: 'Profile Picture'
},
{
  key: 'tab3',
  tab: 'Change Password'
},
{
  key: 'tab4',
  tab: 'Change Email'
},
{
  key: 'tab5',
  tab: 'Settings'
}]

const contentList = {
  tab1: <p>Basic Information</p>,
  tab2: <p>Profile Picture</p>,
  tab3: <p>Change Password</p>,
  tab4: <p>Change Email</p>,
  tab5: <p>Settings</p>
}

const tabListNoTitle = [{
  key: 'enrhis',
  tab: 'Enrolment History'
}, {
  key: 'curryrlvl',
  tab: 'Curricular Year Level'
}, {
  key: 'evalsum',
  tab: 'Evaluation Summary'
}]

const contentListNoTitle = {
  enrhis: <p>enrhis content</p>,
  curryrlvl: <p>curryrlvl content</p>,
  evalsum: <p>evalsum content</p>
}

class ProfileTabs extends Component {
  state = {
    key: 'tab1',
    noTitleKey: 'enrhis'
  }
  onTabChange = (key, type) => {
    console.log(key, type)
    this.setState({ [type]: key })
  }
  render () {
    return (
      <div>
        <Card
          style={{ width: '100%' }}
          title='Academic Information'
          extra={<a href='#'>More</a>}
          tabList={tabList}
          onTabChange={(key) => { this.onTabChange(key, 'key') }}
        >
          {contentList[this.state.key]}
        </Card>
        <br /><br />
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          onTabChange={(key) => { this.onTabChange(key, 'noTitleKey') }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    )
  }
}

ProfileTabs.propTypes = {

}

export default ProfileTabs
