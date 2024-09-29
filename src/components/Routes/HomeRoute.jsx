import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

const HomeRoute = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default HomeRoute