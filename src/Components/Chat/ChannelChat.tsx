import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { BASE_URL } from "../utils/baseUrl";
import { messageResponse } from "../utils/dataResponse/messages";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

export default function ChatChannelId() {
    const[cookies] = useCookies(['token']); 
    const token = cookies.token;
    const[cookie] = useCookies(['id']); 
    const id = cookie.id;
    const[messages, setMessages] = useState<messageResponse[] | undefined>(undefined)
    const[channel, setChannel] = useState<any>(undefined);
    
  const schema = yup.object({
    content: yup.string().required(),
})

type FormData = {
   channelId: number,
   content: string
}
  const { handleSubmit , register , formState: { errors } } = useForm<FormData>({
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
                console.log(response);
               setMessages(response.data.messages);           
            } catch (error) {
                console.error(error); 
            }
        }
        getChatByChannel();
    }, [])

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
    },[])

    const sendMessage =  async (data : FormData) => {
      data.channelId=id
      try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
              }
           const response = await axios.post(BASE_URL+'message', data, config)
             console.log
             (response.data.message);
        } catch (error) {
            console.error(error);
        } 
    }

    return (
        <>
          <div className="channel">
            { channel && 
              (<>
                 <p>{channel.name}</p>
              </>)
            }
          </div>
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
          <form onSubmit={handleSubmit(sendMessage)}>
              <input type="text"
              {...register("content",{required: true})}
              />
              <button type="submit">send</button>
          </form>
          </div>
          
        </>
    )
}