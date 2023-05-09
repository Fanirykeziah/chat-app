import { useRouter } from "next/router";
import { useState } from "react"
import styles from '@/styles/signup.module.css'

export default function SignUp() {
  const router = useRouter();
  const[username , setUsername] = useState("");
  const[password , setPassword] = useState("");
  
  const handleSubmit = (event : React.FormEvent) => {
      event.preventDefault(); 

      localStorage.setItem('username',username); 
      localStorage.setItem('password',password);

    router.push('/');
  }

    return ( 
        <>
           <div className={styles.formcontainer}>
              <h1>Sign Up</h1>
              <div className={styles.form}>
                <input type="text" 
                placeholder="Username" 
                className={styles.input} 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}/>

                <input type="password" 
                placeholder="Password" 
                className={styles.input} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                <input type="button" 
                value="Save" 
                className={styles.btn} 
                onClick={handleSubmit}/>
              </div>
           </div>
        </>
    )
}