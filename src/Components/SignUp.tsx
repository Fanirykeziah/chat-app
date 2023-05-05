import { useRouter } from "next/router";
import { useState } from "react"

export default function SignUp() {
  const router = useRouter();
  const[username , setUsername] = useState("");
  const[password , setPassword] = useState("");
  
  const handleSubmit = () => {
      localStorage.setItem('username',username); 
      localStorage.setItem('password',password);

    router.push('/');
  }

    return ( 
        <>
           <div className="form-container">
              <h1>Sign Up</h1>
              <div className="form">
                <input type="text" 
                placeholder="Username" 
                className="input" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}/>

                <input type="password" 
                placeholder="Password" 
                className="input" 
                value={password} onChange={(e) => setPassword(e.target.value)}/>

                <input type="button" 
                value="Save" 
                className="btn" 
                onClick={handleSubmit}/>
              </div>
           </div>
        </>
    )
}