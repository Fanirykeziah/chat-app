import Channel from "@/Components/LandingPage";
import Nav from "@/Components/Navbar/Navbar";
import User from "@/Components/User";
import styles from '@/styles/profile.module.css'

export default function getUsers() {
    return (
       <div className={styles.container}>
          <Nav/>
            <div className={styles.middle}>
                <Channel/>
                <User/>
            </div>
       </div>
    )
     
}