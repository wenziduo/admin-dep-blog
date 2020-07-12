import React from 'react'
import { Divider, Avatar } from 'antd'

export function columns(handleEdit, handleDel) {
  return [
    {
      title: '图片',
      dataIndex: 'imgUrl',
      width: 100,
      render: text => <Avatar size={64} src={text} />
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 100
    },
    {
      title: '数量',
      dataIndex: 'count',
      width: 100
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      render: (text, record) => (
        <div>
          <a onClick={handleEdit.bind(this, record)}>修改</a>
            <Divider type="vertical" />
          <a
            onClick={handleDel.bind(this, record)}
            style={{ color: 'orangered' }}
          >
            删除
          </a>
        </div>
      )
    }
  ]
}
