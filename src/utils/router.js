import ClassifyOperate from '../pages/classify/operate'
import PostCreate from '../pages/post/create'
import EditCreate from '../pages/post/create'
import PostOperate from '../pages/post/operate'

export const routerData = [
  {
    title: '类别操作',
    key: '/classify/operate',
    path: '/classify/operate',
    menuShow: true,
    menuKey: 'classify',
    component: ClassifyOperate
  },
  {
    title: '新增文章',
    key: '/post/create',
    path: '/post/create',
    menuShow: true,
    menuKey: 'post',
    component: PostCreate
  },
  {
    title: '修改文章',
    key: '/post/operate',
    path: '/post/operate/edit',
    menuShow: false,
    menuKey: 'post',
    component: EditCreate
  },
  {
    title: '文章操作',
    key: '/post/operate',
    path: '/post/operate',
    menuShow: true,
    menuKey: 'post',
    component: PostOperate
  }
]
