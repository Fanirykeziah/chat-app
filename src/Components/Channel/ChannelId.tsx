import { useEffect, useState } from "react";
import axios from "axios";
import { channelsResponse } from "../utils/dataResponse/channelById";
import { useCookies } from "react-cookie";

const ChannelId = (id : number) => {
  const [dataList, setDataList] = useState<channelsResponse[] | undefined>(undefined);
  const[cookies] = useCookies(['token']); 
  const token = cookies.token;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.get(`http://localhost:8080/channel/${id}`, config);
         setDataList(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {dataList && dataList.length > 0 ? (
        dataList.map((data: channelsResponse, index: number) => (
          <div key={index}>
            <h1>{data.name}</h1>
            <p>{data.type}</p>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ChannelId;


  
   
