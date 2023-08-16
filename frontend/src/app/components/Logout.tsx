
import React from 'react'
import {useRouter} from 'next/navigation'
import { useAppDispatch } from '../redux/hook';
import axios from 'axios';
import { authActions } from '../redux/slices/authSlice';
import { baseUrl } from '../utils/constant';
axios.defaults.withCredentials = true;

const Logout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async() => {
        const url = `${baseUrl}/auth/logout`
        try {
            await axios.post(url, null,{withCredentials:true})
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
