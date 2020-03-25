import moment from 'moment'
export function columnsPv() {
  return [
    {
      title: '城市',
      dataIndex: 'city',
      width: 100
    },
    {
      title: '访问ip',
      dataIndex: 'ip',
      width: 100
    },
    {
      title: '访问时间',
      dataIndex: 'createTime',
      width: 100,
      render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
  ]
}

export function columnsVv() {
  return [
    {
      title: '城市',
      dataIndex: 'city',
      width: 100
    },
    {
      title: '访问ip',
      dataIndex: 'ip',
      width: 100
    },
    {
      title: '访问时间',
      dataIndex: 'createTime',
      width: 100,
      render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
  ]
}