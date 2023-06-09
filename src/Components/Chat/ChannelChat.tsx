import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { BASE_URL } from "../utils/baseUrl";
import { messageResponse } from "../utils/dataResponse/messages";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '@/styles/channel.module.css'
import moment from "moment";

export default function ChatChannelId() {
    const[cookies] = useCookies(['token']); 
    const token = cookies.token;
    const[cookie] = useCookies(['id']); 
    const id = cookie.id;
    const[messages, setMessages] = useState<messageResponse[]>([])
    const[channel, setChannel] = useState<any>(undefined);
    
  const schema = yup.object({
    content: yup.string().required(),
})

type FormData = {
   channelId: number,
   content: string,
   createdAt: EpochTimeStamp,
   sender: {
    name: string
   }
}
  const { handleSubmit , register , formState: { errors } , reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

    useEffect(() => {
        async function getChatByChannel() {
            try {
              const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
              }
              const response = await axios.get(`http://localhost:8080/messages/channel/${id}`, config) ; 
               setMessages(response.data.messages);    
            } catch (error) {
                console.error(error); 
            }
        }
        getChatByChannel();
    }, [messages])

    useEffect(() => {
        async function getChannelById() {
            try {
               const config = {
                 headers: {
                    Authorization: `Bearer ${token}`
                 }
               }
               const response = await axios.get(`http://localhost:8080/channel/${id}`, config);
                 setChannel(response.data.channel)
                 
            } catch (error) {
                console.error(error)
            }
        }getChannelById();
    },[channel])

    const sendMessage =  async (data : FormData) => {
      data.channelId=id
      try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
              }
           const response = await axios.post(BASE_URL+'message', data, config)
             reset();    
        } catch (error) {
            console.error(error);
        } 
    }
    
    return (
        <div  className={styles.send_channel_message}>
          <div>
            { channel && 
              (<p className={styles.name}>{channel.name}</p>)
            }
          </div>
          <div className="messages">
                       <div style={{ flexDirection: 'column-reverse' }}>
            {messages && messages.length > 0 ? 
                (messages.map((data : messageResponse , index: number) => (
                   <div key={index}>
                     <p>{data.sender?.name}</p>
                     <p>{data.content}</p> 
                     <p>{moment(data.createdAt).fromNow()}</p> 
                   </div>
                ))) : (<p></p>) 
             }
            </div>  
            
          </div>
          <div>
          <form onSubmit={handleSubmit(sendMessage)} className={styles.chat}>
              <input type="text"
              {...register("content",{required: true})}
              className={styles.input}
              />
              <button type="submit" className={styles.sendMessage}>send</button>
          </form>
          </div>
          
        </div>
    )
}