import React from 'react';
import Wrapper from '../../components/Wrapper';
import { BiUser } from 'react-icons/bi';
import Box from '../../components/Box';
import Typograph from '../../components/Typograph';
import { NavLink } from 'react-router';

export default function Comp_Card({
  redirect = false,
  title,
  info,
  ReactIcon = BiUser,
}) {
  return redirect ? (
    <NavLink
      to={redirect}
      className='rounded-md w-full grid grid-cols-[auto_1fr] items-center gap-x-2 p-2 border border-black bg-green-300 hover:bg-green-500'>
      <Box
        display='grid'
        className='row-span-2 col-start-1 col-end-2 h-full min-w-14 bg-green-200 border border-green-900 rounded-full place-items-center'>
        <ReactIcon className='text-3xl text-green-900' />
      </Box>
      <Typograph
        label={title}
        className='row-start-1 row-end-2 col-start-2 col-end-3 font-semibold text-lg'
      />
      <Typograph
        label={info}
        className='row-start-2 row-end-3 col-start-2 col-end-3'
      />
    </NavLink>
  ) : (
    <Wrapper
      display='grid'
      position='static'
      bgColor='none'
      className='rounded-md w-full grid-cols-[auto_1fr] items-center gap-x-2 p-2 border border-black bg-gray-400'>
      <Box
        display='grid'
        className='row-span-2 col-start-1 col-end-2 h-full min-w-14 bg-gray-300 border border-gray-900 rounded-full place-items-center'>
        <ReactIcon className='text-3xl text-green-900' />
      </Box>
      <Typograph
        label={title}
        className='row-start-1 row-end-2 col-start-2 col-end-3 font-semibold text-lg'
      />
      <Typograph
        label={info}
        className='row-start-2 row-end-3 col-start-2 col-end-3'
      />
    </Wrapper>
  );
}
