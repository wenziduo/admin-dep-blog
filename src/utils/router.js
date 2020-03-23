import Home from '../pages/home'
import ClassifyOperate from '../pages/classify/operate'
import PostCreate from '../pages/post/create'
import EditCreate from '../pages/post/create'
import PostOperate from '../pages/post/operate'

export const routerData = [
  {
    title: '首页',
    key: '/home',
    path: '/',
    menuShow: true,
    menuKey: 'root',
    breadcrumb: [{ title: '首页' }],
    component: Home
  },
  {
    title: '类别操作',
    key: '/classify/operate',
    path: '/classify/operate',
    menuShow: true,
    menuKey: 'classify',
    breadcrumb: [{ title: '类别' }, { title: '类别操作' }],
    component: ClassifyOperate
  },
  {
    title: '新增文章',
    key: '/post/create',
    path: '/post/create',
    menuShow: true,
    menuKey: 'post',
    breadcrumb: [{ title: '文章' }, { title: '新增文章' }],
    component: PostCreate
  },
  {
    title: '修改文章',
    key: '/post/operate',
    path: '/post/operate/edit',
    menuShow: false,
    menuKey: 'post',
    breadcrumb: [{ title: '文章' }, { title: '文章操作', path: '/post/operate' }, { title: '修改文章' }],
    component: EditCreate
  },
  {
    title: '文章操作',
    key: '/post/operate',
    path: '/post/operate',
    menuShow: true,
    menuKey: 'post',
    breadcrumb: [{ title: '文章' }, { title: '文章操作' }],
    component: PostOperate
  }
]
