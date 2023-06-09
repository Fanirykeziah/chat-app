import CreateChannel from "@/Components/Channel/CreateChannel";
import Channel from "@/Components/LandingPage";
import Nav from "@/Components/Navbar/Navbar";
import styles from '@/styles/channel.module.css'

export default function CreateChannelForm() {
    return (
        <>
          <div className={styles.container}>
             <Nav/> 
             <div className={styles.channel}>
                <Channel/>
                 <CreateChannel/>
             </div>
          </div>
        </>
        
    )
}