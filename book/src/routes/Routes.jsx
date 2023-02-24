
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminPage from '../pages/Admin'
import Shop from '../pages/Shop'
import NoHeader from '../components/noHeader/NoHeader'
import UserInfo from '../pages/UserInfo'
import Cart from '../pages/Cart'
import YourOrder from '../pages/YourOrder'
import DetailBook from '../pages/DetailBook'
import UserManager from '../components/Admin/UserManager'
import BookManager from '../components/Admin/BookManager'
import AdminHome from '../components/Admin/AdminHome'

//ko dang nhap van xem dc
const publicRoutes = [
  {
      path: '/',
      component: Home,
  },
  {
      path: '/login',
      component: Login,
  },
  {
      path: '/register',
      component: Register,
  },
  {
      path: '/api/books',
      component: Shop,
      // layout: HeaderOnly,
  },
  {
    path: '/api/books/:page',
    component: Shop,
    // layout: HeaderOnly,
  },
  {
    path: '/user-info',
    component: UserInfo,
    // layout: HeaderOnly,
  },
  {
    path: '/cart',
    component: Cart,
    // layout: HeaderOnly,
  },
  {
    path: '/your-order',
    component: YourOrder  ,
  },
  {
    path: '/detail/:id',
    component: DetailBook,
  },
  {
    path: '/admin/user',
    component: UserManager,
    layout:AdminPage,
  },
  {
    path: '/admin/book-manager',
    component: BookManager,
    layout:AdminPage,
  },
  {
    path: '/admin',
    component: AdminHome,
    layout: AdminPage,
  },
  {
    path: '/admin',
    component: AdminPage,
    layout: NoHeader,
  }
];
export default publicRoutes