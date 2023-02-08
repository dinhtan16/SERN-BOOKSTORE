import React from 'react'

import { Outlet } from 'react-router-dom'
const NoHeader = () => {
  return (
   <>
        {/* <Naivgate /> */}
        {/* <RouterLayout /> */}
        {/* <AdminPage /> */}
        <Outlet />
       {/* <Footer /> */}
   </>
  )
}

export default NoHeader