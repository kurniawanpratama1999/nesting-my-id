import api_collection from '../../api/api_collection';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import hit_api from '../../utils/fetcher';

export default function Page_ChangeUsername() {
  const [oldUsername, setOldUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Searching Data');
  const [messageColor, setMessageColor] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const net = api_collection.user.changeUsername;
    const body = {
      oldUsername,
      newUsername,
    };

    setLoadingMessage("Searching Data")
    setIsLoading(true);

    hit_api(net, 'PUT', body)
      .then((res) => {
        setLoadingMessage(res.message);
        setMessageColor(res.success);
        if (res.success) {
          setTimeout(() => navigate('/profile'), 2000);
        }
      })
      .catch((err) => setLoadingMessage(err))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 2000);
      });
  };
  return (
    <Container className='items-center justify-center'>
      {isLoading && (
        <p
          className={`absolute top-16 italic text-lg font-semibold ${
            messageColor ? 'text-emerald-700' : 'text-red-500'
          }`}>
          {loadingMessage}
        </p>
      )}
      <Form onSubmit={handleSubmit} title='Change Username'>
        <Input
          title='Old Username'
          htmlFor='old-username'
          value={oldUsername}
          onChange={({ target }) => setOldUsername(target.value)}
        />
        <Input
          title='New Username'
          htmlFor='New-username'
          value={newUsername}
          onChange={({ target }) => setNewUsername(target.value)}
        />
        <Button
          type='submit'
          label='Save Change'
          bgColor={isLoading ? 'gray' : 'emerald'}
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </Form>
    </Container>
  );
}
