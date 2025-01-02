import React from 'react';
import { BiMap, BiWorld } from 'react-icons/bi';
import {
  FaBlogger,
  FaBuilding,
  FaCartShopping,
  FaFacebook,
  FaGithub,
  FaHouse,
  FaInstagram,
  FaShop,
  FaTelegram,
  FaThreads,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa6';

export const IconCollection = {
  instagram: {
    icon: FaInstagram,
    color: 'bg-amber-600 text-amber-200',
  },
  facebook: {
    icon: FaFacebook,
    color: 'bg-blue-600 text-blue-200',
  },
  threads: {
    icon: FaThreads,
    color: 'bg-black text-white',
  },
  whatsapp: {
    icon: FaWhatsapp,
    color: 'bg-green-600 text-green-200',
  },
  telegram: {
    icon: FaTelegram,
    color: 'bg-sky-600 text-sky-200',
  },
  'twitter/x': {
    icon: FaTwitter,
    color: 'bg-blue-600 text-blue-200',
  },
  building: {
    icon: FaBuilding,
    color: 'bg-sky-600 text-sky-200',
  },
  github: {
    icon: FaGithub,
    color: 'bg-gray-600 text-gray-200',
  },
  site: {
    icon: BiWorld,
    color: 'bg-gray-600 text-gray-200',
  },
  map: {
    icon: BiMap,
    color: 'bg-red-600 text-red-200',
  },
  shop: {
    icon: FaShop,
    color: 'bg-pink-600 text-pink-200',
  },
  olshop: {
    icon: FaCartShopping,
    color: 'bg-purple-600 text-purple-200',
  },
  office: {
    icon: FaBuilding,
    color: 'bg-violet-600 text-violet-200',
  },
  home: {
    icon: FaHouse,
    color: 'bg-green-600 text-green-200',
  },
  blog: {
    icon: FaBlogger,
    color: 'bg-orange-600 text-green-200',
  },
};

export default function Comp_PopupLogo({
  setState,
  setSelection,
  setIsPopupLogo,
}) {
  return (
    <div
      id='popup-logo'
      onClick={({ target }) => {
        if (target.id == 'popup-logo') {
          setState(false);
        }
      }}
      className='fixed grid place-items-center w-full h-full top-0 left-0 bg-black/20 backdrop-blur-sm z-50'>
      <div className='w-72 h-[70vh] select-none bg-yellow-200 rounded-sm border border-black/50 overflow-y-auto px-2'>
        {Object.entries(IconCollection)
          .sort()
          .map(([list, details], index) => (
            <div
              key={index}
              onClick={() => {
                setSelection(list);
                setIsPopupLogo(false);
              }}
              className='flex items-center gap-2 text-lg py-3 hover:pl-6 border-b border-gray-500 hover:bg-black/20 px-3 transition-all'>
              <details.icon className='text-3xl px-1' />
              <span className='italic capitalize font-semibold'>{list}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
