import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Accueil() {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password'); 

    if(!username && !password){
      router.push('/signup');
    }
  }, [])

    return (
        <>
           <div className="container">
              <div className="global"></div>
              <div className="chat">
                <h1>Hello , you're authenticated</h1>
              </div>
           </div>
        </>
    )
}