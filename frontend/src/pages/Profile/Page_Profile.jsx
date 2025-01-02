import Container from '../../components/Container';
import Comp_Card from './Comp_Card';
import {
  BiCalendarPlus,
  BiLock,
  BiLogIn,
  BiUserCheck,
  BiUserPin,
} from 'react-icons/bi';
import { useContext } from 'react';
import { ProfileContext } from '../../contexts/ProfileProvider';

export default function Page_Profile() {
  const { results } = useContext(ProfileContext);

  return (
    <Container className='flex-col items-start gap-5 lg:px-[20%]'>
      <Comp_Card
        redirect='/change-name'
        title='Display Name'
        info={results.display_name}
      />
      <Comp_Card
        ReactIcon={BiUserPin}
        redirect='/change-username'
        title='Username'
        info={results.username}
      />
      <Comp_Card
        ReactIcon={BiUserCheck}
        redirect='/change-email'
        title='Email'
        info={results.email}
      />
      <Comp_Card
        ReactIcon={BiLock}
        redirect='/change-password'
        title='Password'
        info='********'
      />
      <Comp_Card ReactIcon={BiLogIn} title='Last in' info={results.last_in} />
      <Comp_Card
        ReactIcon={BiCalendarPlus}
        title='Join At'
        info={results.join_at}
      />
    </Container>
  );
}
