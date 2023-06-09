import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { BASE_URL } from "../utils/baseUrl";
import styles from '@/styles/login.module.css'

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
        path: '/'
      };  
      setCookie("token", token, options); 

      setEmail('');
      setPassword('');
      setError('');

    router.push('/profile');
    } catch (error) {
      setError('Invalid identifiers');
    }
    }

  return (
    <>
      <h1 className={styles.h1}>Log In</h1>
      <form onSubmit={handleLogin} className={styles.formcontainer}>  
        <input className={styles.input}
        type="email" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <input className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <button className={styles.save} type="submit">Sign in</button> 
        {error && <h5 className={styles.h5}>{error}</h5>}
      </form>
      <p className={styles.p}>If you don't have account,
        <button className={styles.signup} onClick={() => (router.push("/sign-up"))}>Sign-up</button>
        , please!
      </p>
    </>
    )
}

export default LoginPage; 