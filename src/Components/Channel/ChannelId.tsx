import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const ChannelId = () => {
  const [dataList, setDataList] = useState<any>(null);
  const[cookies] = useCookies(['token']); 
  const token = cookies.token;
  const[cookie] = useCookies(['id']);
  const id = cookie.id;

  useEffect(() => {
    getChannelById();
  }, []);

  async function getChannelById() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.get(`http://localhost:8080/channel/${id}`, config);
         console.log(response.data.channel);
              
         setDataList(response.data.channel);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {dataList && (
          <div>
            <h1>{dataList.name}</h1>
            <p>{dataList.type}</p>
          </div>
      )}
    </div>
  );
};

export default ChannelId;


  
   
