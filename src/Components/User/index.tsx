import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { BASE_URL } from "../utils/baseUrl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from '@/styles/profile.module.css'
import Image from "next/image";
import photo from "../assets/pdpdef.webp"

export default function Users() {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const[currentUser , setCurrentUser] = useState<any>(undefined); 
  const[showUserForm , setShowUserForm] = useState(false);
  const schema = yup.object({
    name: yup.string().max(30),
    oldPassword: yup.string(), 
    password: yup.string(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    bio: yup.string()
    });  

  type FormData = yup.InferType<typeof schema>;

  const { handleSubmit, register, formState: { errors}} = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    getCurrentUser();
  }, [currentUser]);

  async function getCurrentUser() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(BASE_URL+'user', config);
      
       setCurrentUser(response.data.user);
         
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
      setShowUserForm(false);
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeUser = () => {
     setShowUserForm(true);
  }

    return(
    <>
    <div className={styles.profile}>
      {showUserForm ? (
        currentUser && (
          <div  className={styles.updateContainer}>
            <form onSubmit={handleSubmit(onUpdate)}>
              <input type="text" defaultValue={currentUser.name} {...register('name')} className={styles.input}/>
                <p>{errors.name?.message}</p>
              <input type="password" placeholder="old password"  {...register('oldPassword')} className={styles.input}/>
                <p>{errors.oldPassword?.message}</p>
              <input type="password" placeholder="new password"  {...register('password')} className={styles.input}/>
                <p>{errors.password?.message}</p>
              <input type="password" placeholder="confirm password" {...register('confirmPassword')} className={styles.input}/>
                <p>{errors.confirmPassword?.message}</p>
              <input type="text" defaultValue="bio" {...register('bio')} className={styles.input}/>
                <p>{errors.bio?.message}</p>
              <button type="submit" className={styles.saveButton}>Save</button>
            </form>
          </div>
        )) : (
         currentUser && (
          <div>
             <Image className={styles.photo} src={photo} alt="user's pic"/>
             <h1>{currentUser.name}</h1>
             <p>{currentUser.bio}</p>
             <button onClick={handleChangeUser} className={styles.updateButton}>Update profil</button>
          </div>
        ) 
      )}
    </div>
    </>
    )
}