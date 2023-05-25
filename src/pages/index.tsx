import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies] = useCookies(['token']);
  const router = useRouter();

  useEffect(() => {
    const token = cookies.token;

    if (token) {
      router.push('/channel');
    } else {
      router.push('/auth');
    }
  }, [cookies, router]);

  return <div>Redirection en cours...</div>;
}
