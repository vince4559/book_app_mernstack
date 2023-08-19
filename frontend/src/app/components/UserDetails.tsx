"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { bookStore } from '../endpoint/bookStore';
import { AUTH } from '../endpoint/routes';
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
        try {
         const res =  await bookStore.get(AUTH.GET_USER, {withCredentials:true})
         const data = await res.data
         setUser(data.user)
        } catch (err) {
            console.log(err)
        }
    };

    const refreshToken = async () => {
      try {
       const res =await bookStore.get(AUTH.REFRESH, {
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
