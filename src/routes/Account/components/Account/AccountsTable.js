import React, { Component } from 'react'

import { Table, Input, Button, Icon, Timeline, Tooltip } from 'antd'

import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/table/style/css'
import 'antd/lib/timeline/style/css'
import 'antd/lib/tooltip/style/css'
import './style.css'

class AccountsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterDropdownVisible: false,
      data: [],
      searchText: '',
      filtered: false,
      filteredInfo: null,
      sortedInfo: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data != null) {
      this.setState({data: nextProps.data})
    }
  }

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value })
  }
  onSearch = () => {
    const { searchText, data } = this.state
    const reg = new RegExp(searchText, 'gi')
    if (searchText) {
      this.setState({
        filterDropdownVisible: false,
        filtered: !!searchText,
        data: data.map((record) => {
          const match = record.username.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            username: (
              <span>
                {record.username.split(reg).map((text, i) => (
                  i > 0 ? [<span className='highlight'>{match[0]}</span>, text] : text
                ))}
              </span>
            )
          }
        }).filter(record => !!record)
      })
    }
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  render () {
    let { sortedInfo, filteredInfo } = this.state
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    const columns = [{
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      filterDropdown: (
        <div className='custom-filter-dropdown'>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder='Search name'
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type='primary' shape='circle' icon='search' size={'default'} onClick={this.onSearch} />
          <Button type='ghost' shape='circle' icon='reload' size={'default'} onClick={e => { this.setState({data: this.props.data}) }} />
        </div>
      ),
      filterIcon: <Icon type='search' style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible
        }, () => this.searchInput && this.searchInput.focus())
      },
      sorter: (a, b) => a.username.length - b.username.length,
      sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order, fixed: 'left'
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order
    }, {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [{
        text: 'Student',
        value: 'student'
      }, {
        text: 'Employee',
        value: 'employee'
      }, {
        text: 'Admin',
        value: 'admin'
      }],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
      sorter: (a, b) => a.role.length - b.role.length,
      sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order
    }, {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 60,
      render: () => <Tooltip placement='left' title={'Reset Password'}><Button type='ghost' shape='circle' icon='loading-3-quarters' /></Tooltip>
    } ]

    return (
      <Table scroll={{ x: 500, y: 500 }} expandedRowRender={record => (<Timeline>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>)} size={'small'} title={() => 'Accounts'} onChange={this.handleChange} rowKey={record => record.username} loading={this.props.fetchingAccounts} columns={columns} dataSource={this.state.data ? this.state.data : []} />
    )
  }
}

AccountsTable.propTypes = {

}

export default AccountsTable
