import React from 'react'
import { NavLink } from 'react-router'

const AskingForgetPassword = () => {
  return (
    <NavLink to='/forget-password' replace={true} className='block text-center text-xs mt-4 text-emerald-600 font-semibold italic font-mono'>Forget Password ?</NavLink>
  )
}

export default AskingForgetPassword