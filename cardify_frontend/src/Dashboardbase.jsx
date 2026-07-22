import React from 'react'
import Dashboardnav from './Components/Dashboardnav'
import { Outlet } from 'react-router-dom'

const Dashboardbase = () => {
  return (
    <>
      <Dashboardnav />
      <Outlet />
    </>
  )
}

export default Dashboardbase
