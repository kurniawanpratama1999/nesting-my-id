import React from 'react';

export default function Comp_Textarea({ state, setState }) {
  return (
    <label
      htmlFor='description'
      className='w-full h-32 text-lg bg-emerald-700 text-emerald-200 text-black/80 flex flex-col outline-emerald-300 rounded-sm focus-within:outline focus-within:outline-1'>
      <textarea
        onChange={({ target }) => setState(target.value)}
        className='grow bg-transparent p-3 border-none outline-none'
        style={{ resize: 'none' }}
        name='description'
        spellCheck='false'
        autoComplete='off'
        placeholder='Description of your link'
        value={state}
      />
      <p className={`px-2 pt-2 text-right font-semibold italic font-mono ${state.length > 200 ? 'text-red-200' : 'text-emerald-200'}`}>
        {200 - state.length}
      </p>
    </label>
  );
}
