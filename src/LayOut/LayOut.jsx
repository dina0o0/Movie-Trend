import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
export default function LayOut({userData, setUserData, saveUserData}) {
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/register')
  }
  console.log('layout', userData)
  return (
    <>
      <NavBar userData={userData} logOut={logOut} saveUserData={saveUserData} />
      <Outlet />
      <Footer />
    </>
  )
}