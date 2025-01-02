import { useState } from 'react';
import cNames from '../utils/cNames';

export default function Menu({ children }) {
  // State For Toggle Menu
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // Handle Click Button & Menu
  const toggleMenuFromButton = () => setIsOpenMenu(!isOpenMenu);
  const toggleMenuFromPopup = () => setIsOpenMenu(false);
  return (
    <>
      <button className='ml-auto sm:hidden' onClick={toggleMenuFromButton}>
        Menu
      </button>
      <div
        id='glass'
        onClick={toggleMenuFromPopup}
        className={`${isOpenMenu ? 'fixed':'hidden'} sm:hidden  top-0 left-0 w-full h-full bg-white/10 backdrop-blur-[1px] z-50`}></div>
      <ul className={cssMenu({ isOpenMenu })} onClick={toggleMenuFromPopup}>
        {children}
      </ul>
    </>
  );
}
const cssMenu = cNames(
  {
    base: 'sm:flex w-fit gap-2 ml-auto',
    'max-sm': 'max-sm:flex-col max-sm:absolute max-sm:ml-none z-50',
    bg: 'max-sm:bg-gray-200 max-sm:top-16 max-sm:right-4',
    border: 'max-sm:border max-sm:border-black',
  },
  {
    isOpenMenu: {
      true: 'flex',
      false: 'hidden',
    },
  }
);
