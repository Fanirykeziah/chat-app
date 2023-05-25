import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { BASE_URL } from "../utils/baseUrl";

function LoginPage() {
    const [email , setEmail] = useState(''); 
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');     
    const [cookies, setCookie] = useCookies(['token']);
    const router = useRouter();


  const handleLogin =async (e: React.FormEvent) => {
        e.preventDefault();

    try {
      const response = await axios.post(BASE_URL+'users/login', { email, password });        
      const token = response.data.user.token; 
      const options = {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // expires in 24 hours
      };  
      setCookie("token", token, options); 

      setEmail('');
      setPassword('');
      setError('');

    router.push('/channel');
    } catch (error) {
      setError('Invalid identifiers');
    }
    }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="email" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <input type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Sign in</button> 
        {error && <div>{error}</div>}
      </form>
      <p>If you don't have account,<button onClick={() => (router.push("/sign-up"))}>Sign-up</button>, please!</p>
    </>
    )
}

export default LoginPage; 