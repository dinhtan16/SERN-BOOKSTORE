
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminPage from '../pages/Admin'
import Shop from '../pages/Shop'
import NoHeader from '../components/noHeader/NoHeader'

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
  },{
    path: '/api/books/:page',
    component: Shop,
    // layout: HeaderOnly,
  },
  {
    path: '/admin',
    component: AdminPage,
    layout: NoHeader,
  }
];
export default publicRoutes