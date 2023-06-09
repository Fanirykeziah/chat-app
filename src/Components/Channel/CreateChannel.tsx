import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { channelResponse } from "../utils/dataResponse/channels";
import { option } from "../utils/dataResponse/options";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../utils/baseUrl";
import styles from '@/styles/form.module.css'

export default function CreateChannel() {
  const animatedComponents = makeAnimated(); 
  const [users , setUsers] = useState<channelResponse[]>();
  const [options , setOptions] = useState<option[]>([]);
  const [type, setType] = useState('public')
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const schema = yup.object({
    name: yup.string().max(30).required(),
    type: yup.string().oneOf(['public', 'private']).required(), 
    members: yup.array().of(yup.number())
    });  

  type FormData = yup.InferType<typeof schema>;

  const { handleSubmit, register, formState: { errors}, setValue , reset} = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data : FormData) => {
    try {
      data.members = data.members || [];
      if (data.type === 'public') {
        if (data.members.length > 0) {
          return console.error('Members must not be specified for a public channel.');
        }
      }
      const config = {
        headers: {
        Authorization: `Bearer ${token}`,},
      };
      await axios.post(BASE_URL+'channel', data, config);
      reset();
  }    
  catch (error) {
      console.error(error)
     }
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
    const data = response.data.users;
    const formattedOptions = data.map((item: any) => ({
      value: item.id,
      label: item.name
    }));
        
      setOptions(formattedOptions);
    } catch (error) {
      console.error(error)
    }
  }
  getAllUsers()
},[users])

    return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text"
           placeholder="name" 
           {...register('name')} 
           className={styles.input}/>
          <p>{errors.name?.message}</p>

          <select {...register('type')} className={styles.input}
          onChange={(e) => {setType(e.target.value)}}>
            <option value="public">Public</option>
            <option value="private">Privé</option>

          </select>
          <p>{errors.type?.message}</p>
          
          {type === 'private' && (
          <Select
            onChange={(e) => {
              let ids = e.map((option: any) => option.value)
              setValue('members', ids)
              }}
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            options={options}/>)}
          
          <button type='submit' className={styles.submit}>submit</button>
        </form>
      </div> 
      </>   
    )
}