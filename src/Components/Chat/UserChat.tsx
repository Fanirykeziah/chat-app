import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { messageResponse } from "../utils/dataResponse/messages";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { BASE_URL } from "../utils/baseUrl";
import styles from '@/styles/channel.module.css';

export default function ChatUserById() {
    const[cookies] = useCookies(['token']); 
    const token = cookies.token;
    const[cookie] = useCookies(['userId']); 
    const id = cookie.userId;
    const[messages, setMessages] = useState<messageResponse[] | undefined>(undefined)
    
  const schema = yup.object({
    content: yup.string().required(),
})

type FormData = {
   recipientId: number,
   content: string
}
  const { handleSubmit , register , formState: { errors } , reset} = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    async function getChatByUser() {
        try {
          const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
          }
          const response = await axios.get(`http://localhost:8080/messages/${id}`, config) ; 
           setMessages(response.data.messages);           
        } catch (error) {
            console.error(error); 
        }
    }
    getChatByUser();
}, [messages])

const sendMessage =  async (data : FormData) => {
    data.recipientId=id
    try {
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`
              }
            }
         const response = await axios.post(BASE_URL+'message', data, config)
           console.log(response.data.message);
           reset();
      } catch (error) {
          console.error(error);
      } 
  }

  return(
    <div className={styles.send_channel_message}>
       <div className="messages">
             {messages && messages.length > 0 ? 
                (messages.map((data : messageResponse , index: number) => (
                   <div key={index}>
                     <p>{data.content}</p>   
                   </div>
                ))) : (<p></p>) 
             } 
          </div>
          <div>
          <form onSubmit={handleSubmit(sendMessage)} className={styles.chat}>
              <input type="text" className={styles.input}
              {...register("content",{required: true})}
              />
              <button type="submit" className={styles.sendMessage}>send</button>
          </form>
          </div>
    </div>
  )
}