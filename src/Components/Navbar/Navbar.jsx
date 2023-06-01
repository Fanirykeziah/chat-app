import photo from "./assets/profile.jpg";
import styles from '@/styles/navbar.module.css'

export default function Nav() {
    return (
    <>
      <div className={styles.nav}>
       <div>
         <button className={styles.profile} onClick={() => (router.push("/profile"))}>My profile</button>
       </div>
      </div>
    </>
    )
    
}