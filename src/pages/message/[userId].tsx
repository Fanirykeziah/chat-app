import ChatUserById from "@/Components/Chat/UserChat";
import Channel from "@/Components/LandingPage";
import Nav from "@/Components/Navbar/Navbar";
import styles from '@/styles/channel.module.css'

export default function ChatUser() {
    return (<>
    
    <div className={styles.container}>
             <Nav/> 
             <div className={styles.channel}>
                <Channel/>
                <ChatUserById/>
             </div>
          </div>
    </>
        
    )
    
}