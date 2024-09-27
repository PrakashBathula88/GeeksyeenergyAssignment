import React, { useContext } from 'react'
import Auth from "../Auth/Auth"
import Home from '../home/Home'
import { Navigate } from 'react-router-dom';
const Private = () => {
  const { isLoggedin } = useContext(Auth);
  if(!isLoggedin){
    return <Navigate to="/signin"></Navigate>
  }
  return <Home/>
}

export default Private
