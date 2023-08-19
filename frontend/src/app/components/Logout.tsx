
import React from 'react'
import {useRouter} from 'next/navigation'
import { useAppDispatch } from '../redux/hook';
import axios from 'axios';
import { authActions } from '../redux/slices/authSlice';
import { bookStore } from '../endpoint/bookStore';
import { AUTH } from '../endpoint/routes';
axios.defaults.withCredentials = true;

const Logout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async() => {
        try {
            await bookStore.post(AUTH.LOGOUT,{withCredentials:true})
            console.log('logout successfully')
            dispatch(authActions.logOut())
            router.push('/')
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div>
      <button onClick={handleLogout} className='btn btn-secondary'>
        Logout
      </button>
    </div>
  )
}

export default Logout
