import React from 'react'
import { Divider } from 'antd'

export function columns() {
  return [
    {
      title: '标题',
      dataIndex: 'title',
      width: 100
    },
    {
      title: '图片',
      dataIndex: 'imgUrl',
      width: 100
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      render: (text, record) => (
        <div>
          <a onClick={this.handleEdit.bind(this, record)}>修改</a>
          <Divider type="vertical" />
          <a
            onClick={this.handleDel.bind(this, record)}
            style={{ color: 'orangered' }}
          >
            删除
          </a>
        </div>
      )
    }
  ]
}
