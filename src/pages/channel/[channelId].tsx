import ChatChannelId from "@/Components/Chat/ChannelChat";
import Channel from "@/Components/LandingPage";
import Nav from "@/Components/Navbar/Navbar";
import styles from '@/styles/channel.module.css'

export default function getChannelId() {

    return (
      <>
        <div className={styles.channel_chat_container}>
          <Nav/>
          <div className={styles.channel}>
              <Channel/>
              <ChatChannelId/>
          </div>
        </div>    
      </>
    )
}