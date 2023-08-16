"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/constant';
axios.defaults.withCredentials = true;

interface PropType {
  _id: string,
  name: string,
  email: string,
};

let firstRender = true;

const UserDetails = () => {
    const [user, setUser] = useState<PropType>()
    // console.log(user)

    const getUser =async () => {
        const url = `${baseUrl}/auth/user`
        try {
         const res =  await axios.get(url, {withCredentials:true})
         const data = await res.data
         setUser(data.user)
        } catch (err) {
            console.log(err)
        }
    };

    const refreshToken = async () => {
      try {
       const res =await axios.get(`${baseUrl}/auth/refresh`, {
         withCredentials:true
       })
       const data = res.data
       setUser(data.user)
      } catch (error) {
       return console.log(error)
      }
     }

     useEffect(() => {
      if(firstRender){
        firstRender = false
        getUser()
      }
      let interval = setInterval(() => {
        refreshToken()
      },1000 *  40)

      return () => clearInterval(interval)

    },[])

  return (
    <div>
      <p>Welcome</p>
      <p>{user && user.email}</p>
    </div>
  )
}

export default UserDetails
