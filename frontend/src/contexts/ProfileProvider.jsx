import api_collection from '../api/api_collection';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import hit_api from '../utils/fetcher';

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [results, setResults] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Searching Data');

  useEffect(() => {
    const net = api_collection.auth.profile;
    hit_api(net, 'GET')
      .then((res) => {
        if (res.success) {
          setResults(res.results);
          setIsLoading(false);
        }
      })
      .catch((err) => setLoadingMessage(err));
  }, [pathname]);
  return isLoading ? (
    <div>{loadingMessage}</div>
  ) : (
    <ProfileContext.Provider value={{ results }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
