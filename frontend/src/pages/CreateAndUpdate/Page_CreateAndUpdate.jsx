import React, { cloneElement, useContext, useEffect, useState } from 'react';
import Container from '../../components/Container';
import Component_CardInput from './Comp_CardInput';
import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import Comp_Textarea from './Comp_Textarea';
import Comp_PopupLogo from './Comp_PopupLogo';
import Comp_Heading from './Comp_Heading';
import { UrlContext } from '../../contexts/UrlProvider';
import api_collection from '../../api/api_collection';
import { useNavigate, useParams } from 'react-router';
import hit_api from '../../utils/fetcher';

export default function Page_CreateAndUpdate() {
  const getContext = useContext(UrlContext);
  const { userLink } = useParams();
  const navigate = useNavigate();
  const [isPopupLogo, setIsPopupLogo] = useState(false);
  const [selection, setSelection] = useState('');
  const [selectID, setSelectID] = useState(0);
  const [description, setDescription] = useState(getContext?.description || '');
  const [countCollections, setCountCollections] = useState(
    getContext?.results.length || 1
  );
  const [collections, setCollections] = useState(
    getContext?.results || [
      {
        id: 1,
        logo: '',
        details: '',
        url: '',
      },
    ]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Processing Data');

  const handleSave = async () => {
    const net = userLink
      ? `${api_collection.user.updateUrl}/${userLink}`
      : api_collection.user.createLink;
    const method = userLink ? 'PUT' : 'POST';
    const body = { description, urls: collections };

    setIsLoading(true);
    hit_api(net, method, body)
      .then((res) => {
        setLoadingMessage(res.message);
        if (res.success) {
          setTimeout(() => navigate(`/collection`, { replace: true }), 4000);
        }
      })
      .catch((err) => setLoadingMessage(err))
      .finally(() => setTimeout(() => setIsLoading(false), 2000));
  };
  
  const handleMore = () => {
    setCountCollections((prev) => prev + 1);
    setCollections((prev) => [
      ...prev,
      { id: countCollections + 1, logo: '', details: '', url: '' },
    ]);
  };

  useEffect(() => {
    setCollections((prev) =>
      prev.map((collection) =>
        collection.id == selectID
          ? { ...collection, logo: selection }
          : collection
      )
    );
  }, [selection]);

  return (
    <Container className='flex-col lg:px-[10%]'>
      {isPopupLogo && (
        <Comp_PopupLogo
          setState={setIsPopupLogo}
          setSelection={setSelection}
          setIsPopupLogo={setIsPopupLogo}
        />
      )}
      <Comp_Heading />
      <form className='w-full'>
        <Comp_Textarea state={description} setState={setDescription} />
        {collections.map((collection) => (
          <Component_CardInput
            key={collection.id}
            state={collection}
            setCollections={setCollections}
            setSelectID={setSelectID}
            setIsPopupLogo={setIsPopupLogo}
          />
        ))}

        <Wrapper className='gap-5 flex-wrap justify-center mt-5' border='none'>
          <Button
            label='Save'
            bgColor={isLoading ? 'gray' : 'emerald'}
            type='button'
            width='self'
            className='w-20 border border-emerald-800'
            disabled={isLoading}
            onClick={handleSave}
          />
          <Button
            label='More'
            bgColor='blue'
            type='button'
            width='self'
            className='w-20 border border-blue-800'
            onClick={() => handleMore()}
          />
        </Wrapper>
        {isLoading && (
          <p className='text-center py-2 font-semibold italic text-lg'>
            {loadingMessage}
          </p>
        )}
      </form>
    </Container>
  );
}
