import ChannelForm from "@/Components/Channel/EditChannel";
import EditChannel from "@/Components/Channel/EditChannel";
import Channel from "@/Components/LandingPage";
import Nav from "@/Components/Navbar/Navbar";
import styles from '@/styles/channel.module.css'

export default function EditChannels() {
    return (
        <>
        <div className={styles.channel_chat_container}>
          <Nav/>
          <div className={styles.channel}>
              <Channel/>
              <ChannelForm/>
          </div>
        </div>  
        </>
    )
}
