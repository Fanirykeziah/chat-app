import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface tokenReponse {
    token: string 
}

function LoginPage() {
    const [email , setEmail] = useState(''); 
    const [password , setPassword] = useState('');
    const [error , setError] = useState(''); 
    const router = useRouter(); 

    const handleLogin =async (e: React.FormEvent) => {
        e.preventDefault();

    try {
      const response = await axios.post<tokenReponse>('http://localhost:8080/users/login', { email, password });
      console.log(response);
      
      setEmail('');
      setPassword('');
      setError('');

      router.push('/');
    } catch (error) {
      setError('Identifiants invalides');
    }
    }


    return (
        <>
           <form onSubmit={handleLogin}>
              <input type="email" 
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              />
              <input type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
               {error && <div>{error}</div>}
              <button type="submit">Log in</button> 
           </form>
        </>
    )
}

export default LoginPage; 