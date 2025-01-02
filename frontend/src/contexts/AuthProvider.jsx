import api_collection from '../api/api_collection';

import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useLocation } from 'react-router';
import hit_api from '../utils/fetcher';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);
  const { key } = useLocation();

  useEffect(() => {
    const net = api_collection.auth.protectedPage;
    hit_api(net, 'POST')
      .then((res) => {
        setIsAuth(res.success);
      })
      .catch((err) => {
        setIsAuth(false);
      });
  }, [key]);
  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
