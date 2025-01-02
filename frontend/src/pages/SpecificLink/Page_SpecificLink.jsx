import Container from '../../components/Container';
import Comp_Card from './Comp_Card';
import { useContext } from 'react';
import { UrlContext } from '../../contexts/UrlProvider';

const emptyResults = [];

export default function Page_SpecificLink() {
  const { results, username, description } = useContext(UrlContext);

  return (
    results && (
      <Container className='flex-col gap-5 items-center justify-center lg:px-[20%] px-5 pb-10'>
        <h1 className='text-4xl font-semibold text-center'>
          Connect with {username}
        </h1>
        <p className='text-2xl text-center'>{description}</p>
        <div
    className={`grid ${
      results && (results.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1')
    } gap-4`}>
    {results
      ? results.map((collection) => (
          <Comp_Card key={collection.id} collections={collection} />
        ))
      : emptyResults.map((collection) => (
          <Comp_Card key={collection.id} collections={collection} />
        ))}
  </div>
      </Container>
    )
  );
}
