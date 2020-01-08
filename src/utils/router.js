import ClassifyOperate from '../pages/classify/operate'
import PostCreate from '../pages/post/create'
import PostOperate from '../pages/post/operate'
import { Icon } from 'antd'
export const routerData = [
  {
    title: '分类',
    path: '/classify',
    children: [
      {
        title: '类别操作',
        path: '/operate',
        component: ClassifyOperate
      }
    ]
  },
  {
    title: '文章',
    path: '/post',
    children: [
      {
        title: '新增文章',
        path: '/create',
        component: PostCreate
      },
      {
        title: '文章操作',
        path: '/operate',
        component: PostOperate
      }
    ]
  }
]
