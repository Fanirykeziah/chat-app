import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { BASE_URL } from "../utils/baseUrl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Users() {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const[dataList , setDataList] = useState<any>(undefined); 
  const[bio , setBio] = useState(''); 
  const[showInput , setShowInput] = useState(false);
  const router = useRouter();

  const schema = yup.object({
    name: yup.string().max(30),
    oldPassword: yup.string(), 
    newPassword: yup.string(),
    confirmPassword: yup.string(),
    bio: yup.string()
    });  

  type FormData = yup.InferType<typeof schema>;

  const { handleSubmit, register, formState: { errors}} = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(BASE_URL+'user', config);
      console.log(response.data.user);
      
       setDataList(response.data.user);
         
    } catch (error) {
      console.error(error);
    }
  }
  
  const onUpdate = async (data : FormData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(BASE_URL+'user',data , config)
      setShowInput(false);
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddBio = () => {
     setShowInput(true);
  }

    return(
    <>
    <div>
      {showInput ? (
        dataList && (
          <form onSubmit={handleSubmit(onUpdate)}>
          <input type="text" defaultValue={dataList.name} {...register('name')}/>
          <p>{errors.name?.message}</p>
          <input type="text" placeholder="old password"  {...register('oldPassword')}/>
          <p>{errors.oldPassword?.message}</p>
          <input type="text" placeholder="new password"  {...register('newPassword')}/>
          <p>{errors.newPassword?.message}</p>
          <input type="text" placeholder="confirm password" {...register('confirmPassword')}/>
          <p>{errors.confirmPassword?.message}</p>
          <input type="text" defaultValue={dataList.bio} {...register('bio')}/>
          <p>{errors.bio?.message}</p>
          <button type="submit">Update</button>
        </form>
        )
        
      ) : (
         dataList && (
          <div>
             <h1>{dataList.name}</h1>
             <p>{dataList.email}</p>
             <p>{dataList.bio}</p>
             <button onClick={handleAddBio}>Update profil</button>
        </div>
        ) 
      )}
    </div>
    
    
        <p></p>
    </>
    )
}