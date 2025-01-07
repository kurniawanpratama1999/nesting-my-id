import Container from '../../components/Container';
import { useContext } from 'react';
import Comp_Card from './Comp_Card';
import Wrapper from '../../components/Wrapper';
import { LinkContext } from '../../contexts/LinkProvider';

export default function Page_LinkCollection() {
  const { displayName, results } = useContext(LinkContext);

  return (
    <Container display='static' className='gap-x-5 justify-center text-gray-300'>
      <h1 className='text-3xl col-span-2 text-center font-semibold font-mono mb-5'>
        Welcome {displayName}
      </h1>

      <Wrapper
        position='static'
        className='flex-wrap justify-center gap-5'
        border='none'>
        {results &&
          results.map((collection, colIndex) => {
            return (
              <Comp_Card
                key={collection?.link_id}
                collection={collection}
                user={results?.username}
                colIndex={colIndex}
              />
            );
          })}
      </Wrapper>
    </Container>
  );
}
