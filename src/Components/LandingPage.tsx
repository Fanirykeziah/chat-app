import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { channelsResponse } from "./utils/dataResponse/channelById";
import { useCookies } from "react-cookie";
import { BASE_URL } from "./utils/baseUrl";
import styles from '@/styles/landing.module.css'
import  {UsersResponse}  from "./utils/dataResponse/UsersIdResponse";

const Channel = () => {
  const [dataList, setDataList] = useState<channelsResponse[] | undefined>(undefined);
  const [users , setUsers] = useState<UsersResponse[] | undefined>(undefined);
  const router = useRouter();
  const [cookies] = useCookies(['token']);
  const [cookie , setCookie] = useCookies(['id']);
  const [cook,setCook] = useCookies(['userId'])
  const token = cookies.token;
  const options = {
    path: '/',
  };

  useEffect(() => {
    getChannels();
  }, [dataList]);

  async function getChannels() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.get(BASE_URL+'channels', config);
         setDataList(response.data.channels);
         
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = (id :  number ) => {
       setCookie("id" , id , options )
       router.push(`channel/edit/${id}`)
  }
  
  const clickName = (id : number) => {
    setCookie("id" , id , options )
    const currentChannelId = router.query.id;
    if (router.pathname !== '/channel/[id]' || String(currentChannelId) !== String(id)) {
      router.push('/channel/[id]', `/channel/${id}`);
    }
  }

  const clickUserName = (userId : number) => {
    setCook('userId' , userId , options )
      router.push('/message/[userId]', `/message/${userId}`)
  }
  
useEffect(() => {
  async function getAllUsers() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }; 
    const response = await axios.get(BASE_URL+'users', config); 
     setUsers(response.data.users);
    } catch (error) {
      console.error(error)
    }
  }
  getAllUsers()
},[users])


  return (
    <div>
      <div className={styles.createChannel}>
        <button className={styles.new} onClick={() => (router.push("/channel/create"))}>Add new channel</button>
      </div>
      <div className={styles.getChannels}>
        <h2>Channel List</h2>
        <div>
          {dataList && dataList.length > 0 ? (dataList.map((data: channelsResponse, index: number) => (
            <div className={styles.channelList} key={index}>   
              <p onClick={() => clickName(data.id)}>{data.name}</p>    
              <button className={styles.updateButton} onClick={() => handleClick(data.id)}>Update</button>  
            </div>
            ))) : (<p></p>)}
        </div>
      </div>
      <div className="getUsers">
        <h2>Users List</h2>
        <div>
          {users && users.length > 0 ? (users.map((data: UsersResponse, index: number) => (
            <div className={styles.channelList} key={index}>   
              <p onClick={() => clickUserName(data.id)}>{data.name}</p>   
            </div>
            ))) : (<p></p>)}
        </div>
      </div>
    </div>   
  );
};

export default Channel;


  
   
