import React from 'react'
import { routerData } from './router'

const menuShowData = routerData.filter(item => item.menuShow)
// menu数据添加图标
const classifyList = menuShowData.map(item => {
  let Icon
  switch (item.path) {
    case '/classify/operate':
      Icon = <i className="iconfont iconclassify"/>
      break
    case '/post/create':
      Icon = <i className="iconfont iconsendpost"/>
      break
    case '/post/operate':
      Icon = <i className="iconfont iconranking_sponsor_post"/>
      break
    default:
      Icon = null
  }
  return {
    ...item,
    Icon
  }
})
// menu数据分类
const classifyRouter = classifyList.filter(item => item.menuKey === 'classify')
const postRouter = classifyList.filter(item => item.menuKey === 'post')
export const menuData = [
  {
    title: '分类',
    key: 'classify',
    children: classifyRouter
  },
  {
    title: '文章',
    key: 'post',
    children: postRouter
  }
]
