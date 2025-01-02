import React from 'react';
import { NavLink } from 'react-router';

export default function AskingUser() {
  return (
    <p className='w-full absolute left-0 -bottom-10 text-sm flex justify-center gap-1'>
      <span>Already have an account?</span>
      <NavLink
        to='/login'
        className='font-semibold italic pb-1 hover:underline underline-offset-[6px] text-green-500'>
        Login
      </NavLink>
    </p>
  );
}
