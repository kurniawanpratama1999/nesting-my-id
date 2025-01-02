import React from 'react';
import { IconCollection } from './Comp_PopupLogo';

export default function Comp_Result({
  username,
  description,
  collections = [],
}) {
  return (
    <div className='grid place-items-center gap-5 mt-5 p-2 border border-gray-500 bg-gray-200 rounded-sm'>
      <h1 className='text-4xl font-semibold'>Connect with {username}</h1>
      <p className='text-2xl text-gray-600 font-semibold'>{description == '' ? 'Kamu Belum Membuat Deskripsi' : description}</p>
      <div className='flex flex-wrap gap-5 justify-center'>
        {collections.map((collection) => {
          const ICON =
            IconCollection?.[collection.logo]?.icon || IconCollection.site.icon;
          return (
            <div key={collection.id} title={collection.url} className='flex gap-2 items-center bg-gray-400 pr-6 rounded-full'>
              <ICON className='text-5xl pl-3 pr-1 bg-black/50 rounded-l-full text-white/60' />
              <div className='flex flex-col max-w-[calc(35ch+30.1px)]'>
                <p className='text-xl font-semibold line-clamp-1' >
                  {collection.details == ''
                    ? 'site: My Project'
                    : collection.details}
                </p>
                <p className='text-sm italic break-words line-clamp-1'>
                  {collection.url == '' ? 'http://project.com' : collection.url}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
