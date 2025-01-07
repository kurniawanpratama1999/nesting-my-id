import React from 'react';
import {
  BiRefresh,
  BiSolidDownArrow,
  BiSolidBookReader,
  BiWorld,
  BiSolidTrashAlt,
} from 'react-icons/bi';
import Wrapper from '../../components/Wrapper';
const baseLabel =
  'flex items-center gap-1 overflow-hidden rounded-sm outline outline-1 outline-black/50';
const baseInput =
  'bg-transparent py-1 px-2 grow border-0 outline-0 text-white/80 font-mono';
const baseIcon = 'bg-black/30 h-full text-3xl px-2 text-white/60 min-w-10';

export default function Comp_CardInput({
  state,
  setCollections,
  setSelectID,
  setIsPopupLogo
}) {
  const handleState = (text, value) =>
    setCollections((prev) =>
      prev.map((collection) =>
        collection.id == state?.id ? { ...collection, [text]: value } : collection
      )
    );

  const handleClear = () =>
    setCollections((prev) =>
      prev.map((collection) =>
        collection.id == state?.id
          ? { ...collection, logo: '', details: '', url: '' }
          : collection
      )
    );
  const handleDelete = () =>
    setCollections((prev) => prev.filter((collection) => collection.id !== state?.id));

  return (
    <Wrapper
      display='grid'
      className='md:grid-cols-[1fr_1fr_1fr_auto_auto] grid-cols-[1fr_auto_auto]  gap-2 md:gap-5 py-3 border-dashed border-gray-400'
      border='lg-b'>
      <label
        htmlFor={`logo-${state?.id}`}
        className={`${baseLabel} bg-yellow-700 max-md:col-start-1 max-md:col-end-2 max-md:row-start-1 max-md:row-end-2`}>
        <BiSolidDownArrow className={`${baseIcon}`} />
        <input
          name={`logo-${state?.id}`}
          className={`${baseInput} cursor-pointer border-none outline-none`}
          placeholder='Select url logo'
          value={state?.logo}
          onChange={({ target }) => handleState('logo', target.value)}
          onClick={() => {
            setIsPopupLogo(true)
            setSelectID(state?.id);
          }}
          readOnly
        />
      </label>
      <label
        htmlFor={`details-${state?.id}`}
        className={`${baseLabel} bg-emerald-700 max-md:col-span-3 max-md:row-start-2 max-md:row-end-3`}>
        <BiSolidBookReader className={`${baseIcon}`} />
        <input
          name={`details-${state?.id}`}
          className={`${baseInput} border-none outline-none`}
          spellCheck='false'
          autoComplete='off'
          placeholder='Give the details'
          value={state?.details}
          onChange={({ target }) => handleState('details', target.value)}
        />
      </label>
      <label
        htmlFor={`url-${state?.id}`}
        className={`${baseLabel} bg-indigo-700 max-md:col-span-3 max-md:row-start-3 max-md:row-end-4`}>
        <BiWorld className={`${baseIcon}`} />
        <input
          name={`url-${state?.id}`}
          className={`${baseInput} italic border-none outline-none`}
          spellCheck='false'
          autoComplete='off'
          placeholder='Your http://'
          value={state?.url}
          onChange={({ target }) => handleState('url', target.value)}
        />
      </label>
      <button
        id=''
        type='button'
        className='h-full bg-gray-400 rounded-sm px-3 outline outline-1 outline-gray-500'
        onClick={() => handleClear(state?.id)}>
        <BiRefresh className='text-4xl px-2 text-white/80' />
      </button>
      <button
        id=''
        type='button'
        className='h-full bg-red-400 rounded-sm px-3 outline outline-1 outline-red-800'
        onClick={() => handleDelete(state?.id)}>
        <BiSolidTrashAlt className='text-4xl px-2 text-white/70' />
      </button>
    </Wrapper>
  );
}
