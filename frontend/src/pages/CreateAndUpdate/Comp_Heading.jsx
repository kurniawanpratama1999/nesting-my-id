import { useEffect } from 'react';
import { useParams } from 'react-router';

export default function Comp_Heading() {
  const params = useParams().userLink;
  const noun = params ? 'Update' : 'Create';
  useEffect(() => {}, [params]);
  return (
    <h1 className='text-center text-3xl font-extrabold mb-5 text-gray-300'>
      {noun} Link {params}
    </h1>
  );
}
