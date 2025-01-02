import { useEffect, useRef, useState } from 'react';
import cNames from '../utils/cNames';

export default function Form({
  children,
  className,
  bgColor = 'default',
  border = 'default',
  title,
  ...props
}) {
  return (
    <form
      id='form'
      style={{ boxShadow: '-5px -5px 8px 1px gray' }}
      className={cssForm({ bgColor, border }, className)}
      {...props}>
      <h1 className='text-center text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500'>
        {title}
      </h1>
      <div className='p-4'>{children}</div>
    </form>
  );
}

const cssForm = cNames(
  { base: 'min-w-72 rounded-sm text-lg relative' },
  {
    bgColor: {
      default: 'bg-white',
      transparent: 'bg-transparent',
      dark: 'bg-gray-300',
      light: 'bg-gray-100',
    },
    border: {
      default: 'border border-gray-500',
      transparent: 'border-none',
      dark: 'border border-black',
      light: 'border border-gray-200',
    },
  }
);
