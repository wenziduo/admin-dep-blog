import ClassifyOperate from '../pages/classify/operate'
import PostCreate from '../pages/post/create'
import EditCreate from '../pages/post/create'
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
        show: true,
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
        show: true,
        component: PostCreate
      },
      {
        title: '修改文章',
        path: '/operate/edit',
        show: false,
        component: EditCreate
      },
      {
        title: '文章操作',
        path: '/operate',
        show: true,
        component: PostOperate
      }
    ]
  }
]
