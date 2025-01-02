import api_collection from '../api/api_collection';
import Page_NotFound from '../pages/NotFound/Page_NotFound';
import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import hit_api from '../utils/fetcher';

export const LinkContext = createContext();

const LinkProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(null);

  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const net = api_collection.user.readLink;
    hit_api(net, 'GET')
      .then((res) => {
        setLoadingMessage(res.message);
        if (res.success) {
          setEmail(res.results.email);
          setUsername(res.results.username);
          setDisplayName(res.results.display_name);
          setResults(res.results.urls);
          setTimeout(() => setIsLoading(false), 2000);
        }
      })
      .catch((err) => setLoadingMessage(err));
  }, [pathname]);
  return isLoading ? (
    <Page_NotFound
      title='Get Access For Your Request'
      information={loadingMessage}
    />
  ) : (
    <LinkContext.Provider value={{ username, displayName, email, results }}>
      {children}
    </LinkContext.Provider>
  );
};

export default LinkProvider;
