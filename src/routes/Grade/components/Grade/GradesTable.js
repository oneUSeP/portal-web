import React, { Component } from 'react'

import { Table, Input, Button, Icon, Timeline, Tooltip, Card, Col, Row } from 'antd'

import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/table/style/css'
import 'antd/lib/timeline/style/css'
import 'antd/lib/tooltip/style/css'
import './style.css'

class GradesTable extends Component {
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
          const match = record.code.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            code: (
              <span>
                {record.code.split(reg).map((text, i) => (
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
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      filterDropdown: (
        <div className='custom-filter-dropdown'>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder='Search Code'
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
      sorter: (a, b) => a.code.length - b.code.length,
      sortOrder: sortedInfo.columnKey === 'code' && sortedInfo.order, fixed: 'left'
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order
    }, {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit'
      // sorter: (a, b) => a.unit.length - b.unit.length,
      // sortOrder: sortedInfo.columnKey === 'unit' && sortedInfo.order
    }, {
      title: 'Midterm',
      dataIndex: 'midterm',
      key: 'midterm'
      // sorter: (a, b) => a.midterm.length - b.midterm.length,
      // sortOrder: sortedInfo.columnKey === 'midterm' && sortedInfo.order
    }, {
      title: 'Final',
      dataIndex: 'final',
      key: 'final'
      // sorter: (a, b) => a.final.length - b.final.length,
      // sortOrder: sortedInfo.columnKey === 'final' && sortedInfo.order
    }, {
      title: 'ReExam',
      dataIndex: 'reExam',
      key: 'reExam'
      // sorter: (a, b) => a.reExam.length - b.reExam.length,
      // sortOrder: sortedInfo.columnKey === 'reExam' && sortedInfo.order
    }, {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks'
      // sorter: (a, b) => a.remarks.length - b.remarks.length,
      // sortOrder: sortedInfo.columnKey === 'remarks' && sortedInfo.order
    }, {
      title: 'Midterm Date Posted',
      dataIndex: 'midtermGradeDatePosted',
      key: 'midtermGradeDatePosted'
      // sorter: (a, b) => a.midtermGradeDatePosted.length - b.midtermGradeDatePosted.length,
      // sortOrder: sortedInfo.columnKey === 'midtermGradeDatePosted' && sortedInfo.order
    }, {
      title: 'Final Date Posted',
      dataIndex: 'finalGradeDatePosted',
      key: 'finalGradeDatePosted'
      // sorter: (a, b) => a.finalGradeDatePosted.length - b.finalGradeDatePosted.length,
      // sortOrder: sortedInfo.columnKey === 'finalGradeDatePosted' && sortedInfo.order
    } ]

    return (
      <Table scroll={{ x: 1500 }} size={'middle'} title={() => `Grades for Academic Year ${this.props.params.termTitle}`} onChange={this.handleChange} rowKey={record => record.code} loading={this.props.fetchingGrades} columns={columns} dataSource={this.state.data ? this.state.data : []} />
    )
  }
}

GradesTable.propTypes = {

}

export default GradesTable
