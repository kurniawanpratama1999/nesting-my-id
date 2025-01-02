import Container from '../../components/Container';
import React from 'react';
import { NavLink, useLocation } from 'react-router';

export default function Page_NotFound({
  title = '404 : NOT FOUND',
  information = 'Sorry We Cannot Find Your Page',
}) {
  const location = useLocation().pathname;
  return (
    <Container className='flex-col items-center justify-center gap-3'>
      <p className='text-lg italic font-mono'>path: {location}</p>
      <h1 className='text-3xl font-semibold py-3 border-y-2 border-black'>
        {title}
      </h1>
      <p className='italic text-xl'>{information}</p>
      <NavLink to='/home' className='text-blue-600 font-semibold'>
        Go Home
      </NavLink>
    </Container>
  );
}
