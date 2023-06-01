import ChannelId from "@/Components/Channel/ChannelId";
import ChatChannelId from "@/Components/Chat/ChannelChat";
import { useCookies } from "react-cookie";

export default function getChannelId() {

    return (
        <>
          <ChatChannelId/>
        </>
    )
}