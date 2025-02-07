import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import makeAnimated from 'react-select/animated';
import { option } from '../utils/dataResponse/options';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../utils/baseUrl';
import { useRouter } from "next/router";
import styles from '@/styles/channel.module.css'

const ChannelForm = () => {
  const animatedComponents = makeAnimated();
  const[channelbyId , setChannelById] = useState<any>(null);
  const[options , setOptions] = useState<option[]>();
  const[cookies] = useCookies(['token']);
  const token = cookies.token;
  const[cookie] = useCookies(['id'])
  const id = cookie.id;
  const route = useRouter();
 
  const schema = yup.object({
    members: yup.array().of(yup.number()).required()
});  

type FormData = yup.InferType<typeof schema>;

const { handleSubmit , formState:{ errors}, setValue} = useForm<FormData>({
resolver: yupResolver(schema)
})

  useEffect(() => {
    async function getChannelById() {
      try { 
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        const response = await axios.get(`http://localhost:8080/channel/${id}`, config);
           setChannelById(response.data.channel);
      } catch (error) {
        console.error(error);
      }
    }
    
  getChannelById()
  }, [id]);

  useEffect(() => {
    async function getUsers() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        const response = await axios.get(BASE_URL+'users', config);
        const data = response.data.users;
        const formattedOptions = data.map((item: any) => ({
            value: item.id,
            label: item.name
          }));
          
          setOptions(formattedOptions);  
      } catch (error) {
        console.error(error);
      }
    }
    
  getUsers()
  }, [id]);
  
  const onSubmit = async (data : FormData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
         },
       };
       const response = await axios.post(`http://localhost:8080/channels/${id}/members`, data, config)  
      } catch (error) {
       console.error(error)
      }
   }

  return (
    <div className={styles.channel_edit_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {channelbyId &&  
           (<input type="text" className={styles.input} value={channelbyId.name}/>)}

          <Select
           onChange={(e) => {
            let ids = e.map((option: any) => option.value)
            setValue('members', ids)
          }}
          closeMenuOnSelect={true}
          components={animatedComponents}
          isMulti
          options={options}
          className={styles.input}/>

          <button type='submit' className={styles.submit} onClick={() => route.push(`/channel/${id}`)}>Update</button>
        </form>
    </div>
  );
};

export default ChannelForm;
