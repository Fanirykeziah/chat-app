import Image from "next/image";
import photo from "../assets/pdpdef.webp";
import styles from '@/styles/navbar.module.css'
import { useReducer } from "react";
import Link from 'next/link';
import Channel from "../LandingPage";

export default function Nav() {
    const router = useReducer();
    return (
    <>
      <div className={styles.nav}>
       <div>
        <Link legacyBehavior href="/profile">
           <a><Image src={photo} alt="Add alt" className={styles.image}/></a>
        </Link>
         
       </div>
      </div>
    </>
    )
    
}