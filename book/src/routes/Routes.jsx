
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminPage from '../pages/Admin'
import Shop from '../pages/Shop'
import NoHeader from '../components/noHeader/NoHeader'
import UserInfo from '../pages/UserInfo'
import OrderInfo from '../pages/OrderInfo'

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
    path: '/order-info',
    component: OrderInfo,
    // layout: HeaderOnly,
  },
  {
    path: '/admin',
    component: AdminPage,
    layout: NoHeader,
  }
];
export default publicRoutes