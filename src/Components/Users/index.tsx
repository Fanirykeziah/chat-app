import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { BASE_URL } from "../utils/baseUrl";
import { UsersResponse } from "../utils/dataResponse/users";

export default function Users() {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const[dataList , setDataList] = useState<UsersResponse[]>(); 

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
  
      const response = await axios.get(BASE_URL+'users', config);
         setDataList(response.data.users);
         
    } catch (error) {
      console.error(error);
    }
  }

    return <>
    {dataList && dataList.length > 0 ? (
        dataList.map((data : UsersResponse , index : number) => (
          <div key={index}>
            <h1>{data.name}</h1>
            <p>{data.email}</p>
            <p>{data.bio}</p>
          </div>
        ))
      ) : (
        <p></p>
      )}
        <p></p>
    </>
}