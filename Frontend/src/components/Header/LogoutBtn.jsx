import React from 'react'
import { logout } from '../../store/authSlice'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    navigate("/register")
  }
  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn