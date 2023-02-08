import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Footer from '../pages/Footer'
import Navigate from './Navigate'
import RouterLayout from '../routes/Routes'
// import AdminPage from '../pages/AdminPage'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
   <>
        <Navigate />
        {/* <RouterLayout /> */}
        {/* <AdminPage /> */}
        <Outlet />
       <Footer />
   </>
  )
}

export default Layout