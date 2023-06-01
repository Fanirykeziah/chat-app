import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useRouter } from "next/router";
import { channelResponse } from "../utils/dataResponse/channels";
import { option } from "../utils/dataResponse/options";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../utils/baseUrl";

export default function CreateChannel() {
  const animatedComponents = makeAnimated(); 
  const [users , setUsers] = useState<channelResponse[]>();
  const [options , setOptions] = useState<option[]>([]);
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const router = useRouter();

  const schema = yup.object({
    name: yup.string().max(30).required(),
    type: yup.string().oneOf(['public', 'private']).required(), 
    members: yup.array().of(yup.number()).required()
    });  

  type FormData = yup.InferType<typeof schema>;

  const { handleSubmit, register, formState: { errors}, setValue} = useForm<FormData>({
    resolver: yupResolver(schema)
  })

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

const onSubmit = async (data : FormData) => {
  try {
    const config = {
      headers: {
      Authorization: `Bearer ${token}`,},
    };
    const response = await axios.post(BASE_URL+'channel', data, config)
    router.push("/channel")
  } 
    
  catch (error) {
      console.error(error)
     }
}

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text"
           placeholder="name" 
           {...register('name')} />
          <p>{errors.name?.message}</p>

          <select {...register('type')}>
            <option value="public">Public</option>
            <option value="private">Privé</option>
          </select>
          <p>{errors.type?.message}</p>

          <Select
            onChange={(e) => {
              let ids = e.map((option: any) => option.value)
              setValue('members', ids)
              }}
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            options={options}/>

          <button type='submit'>submit</button>
        </form>
      </>   
    )
}