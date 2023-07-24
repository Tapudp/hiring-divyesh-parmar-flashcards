'use client';
import Welcome from './components/Welcome';
import { useUserContext } from './context';

export default function Home() {
  const {
    state: { userType },
  } = useUserContext();

  return <Welcome />;
}
