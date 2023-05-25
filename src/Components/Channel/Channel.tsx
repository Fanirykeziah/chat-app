import { useEffect, useState } from "react";
import axios from "axios";
import ChannelForm from "./EditChannel";
import { useRouter } from "next/router";
import { channelsResponse } from "../utils/dataResponse/channelById";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../utils/baseUrl";

const Channel = () => {
  const [dataList, setDataList] = useState<channelsResponse[] | undefined>(undefined);
  const [channelID , setChannelID] = useState<number | undefined>(undefined);
  const router = useRouter();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  useEffect(() => {
    getChannels();
  }, []);

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
       setChannelID(id); 
       router.push(`channel/edit/${channelID}`)
  }

  return (
    <div>
      <div className="CreateChannel">
        <button onClick={() => (router.push("/channel/create"))}>Add new channel</button>
      </div>
      <div className="getAllChannels">
        <div className="mapChannels">
          {dataList && dataList.length > 0 ? (dataList.map((data: channelsResponse, index: number) => (
            <div key={index}>
              <h1>{data.name}</h1>
              <p>{data.type}</p>
              <button onClick={() => handleClick(data.id)}>Modifier</button>
            </div>))) : (<p></p>)}
        </div>
      </div>
    </div>   
  );
};

export default Channel;


  
   
