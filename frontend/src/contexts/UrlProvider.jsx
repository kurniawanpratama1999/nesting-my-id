import api_collection from '../api/api_collection';
import Page_NotFound from '../pages/NotFound/Page_NotFound';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import hit_api from '../utils/fetcher';

export const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { userLink } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading');

  const [displayName, setDisplayName] = useState(null);
  const [description, setDescription] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (userLink) {
      const net = `${api_collection.user.readUrl}/${userLink}`;
      hit_api(net, 'GET')
        .then((res) => {
          setLoadingMessage(res.message);
          if (res.success) {
            setResults(res.results.urls);
            setDisplayName(res.results.display_name);
            setDescription(res.results.description);
            setTimeout(() => {
              setIsLoading(false);
            }, 3000);
          } else {
            if (pathname.includes('/update')) {
              setTimeout(() => navigate('/create'), 3000);
            }
          }
        })
        .catch((err) => setLoadingMessage(err));
    }
  }, [pathname]);

  return isLoading ? (
    <Page_NotFound
      title={`Try to get your request`}
      information={loadingMessage}
    />
  ) : (
    <UrlContext.Provider value={{ results, displayName, description }}>
      {children}
    </UrlContext.Provider>
  );
};

export default UrlProvider;
