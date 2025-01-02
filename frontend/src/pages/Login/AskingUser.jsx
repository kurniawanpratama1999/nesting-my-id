import React from 'react';
import { NavLink } from 'react-router';

export default function AskingUser() {
  return (
    <p className='w-full absolute left-0 -bottom-10 text-sm flex justify-center gap-1'>
      <span>Don't you have an account?</span>
      <NavLink to='/register' className='font-semibold italic pb-1 hover:underline underline-offset-[6px] text-blue-500'>
        Register
      </NavLink>
    </p>
  );
}
