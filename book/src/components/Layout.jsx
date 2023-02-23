import React, { useEffect, useLayoutEffect } from 'react'
import Footer from '../pages/Footer'
import Navigate from './Navigate'
import RouterLayout from '../routes/Routes'
// import AdminPage from '../pages/AdminPage'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { fetchCurrentUser } from '../store/slices/userSlice'
const Layout = () => {
  const isLogged = useSelector(state => state.auth.isLoggedIn)
  
  const dispatch =useDispatch()
  useEffect(() => {
    
    //  fetch()
    //  const fetch = async () => {
    //   const res = await getCurrentUser()
    //   console.log(res?.data)
    // }
   setTimeout(() => {
    isLogged  && dispatch(fetchCurrentUser(dispatch))

    },1000)

   
  },[isLogged])
 
  
  return (
   <>
        <Navigate/>
        {/* <RouterLayout /> */}
        {/* <AdminPage /> */}
        <Outlet />
       <Footer />
   </>
  )
}

export default Layout