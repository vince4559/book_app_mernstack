"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React,{useState} from 'react'
import {useAppDispatch} from '../redux/hook'
import { authActions } from '../redux/slices/authSlice';
import { baseUrl } from '../utils/constant';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch()
    const router = useRouter();

    const handleLogin = async(e:React.FormEvent) => {
      e.preventDefault();
      const url = `${baseUrl}/auth/login`;
      dispatch(authActions.login())
      try {
        await axios.post(url, {email, password})
        console.log('login successully')
        
        router.push('/books')
      } catch (err) {
        console.log(err)
      }
    };
    
  return (
    <section className='flex flex-col items-center justify-center w-full h-full gap-4 p-5 bg-black'>
       <p className='my-5 text-red-100'>Please up the forms below to signup</p>
        <form onSubmit={handleLogin} >                  
          <label htmlFor='email'>
            <p>Email:</p>
            <input type='email' inputMode='email'  placeholder='johndoe@dev.com' required
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </label><br/><br/>

          <label htmlFor='password'>
            <p>Password:</p>
            <input type='password' inputMode='text' placeholder='Enter password here' required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </label><br/><br/>

          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </form>
    </section>
  )
}

export default Login
