"use client"
import { useRouter } from 'next/navigation';
import React,{useState} from 'react'
import {useAppDispatch} from '../redux/hook'
import { authActions } from '../redux/slices/authSlice';
import { bookStore } from '../endpoint/bookStore';
import { AUTH } from '../endpoint/routes';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = true






const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch()
    const router = useRouter();

    const sendLoginReg = async() => {
      try {
       await bookStore.post(AUTH.LOGIN, { email, password})
      console.log('login successfull')
      } catch (error) {
      console.log(error)
      }
   };

   const handleLogin = () =>{
    sendLoginReg()
    .then(() => dispatch(authActions.login()))
    // .then(() => router.push('/books'))
   }



    
  return (
    <section className='flex flex-col items-center justify-center w-full h-full p-5 bg-black '>
       <p className='my-5 text-xl text-red-100'>Login Here:</p>
                 
          <label htmlFor='email'>
            <p>Email:</p>
            <input type='email' inputMode='email'  placeholder='johndoe@dev.com' required
              value={email} onChange={(e) => setEmail(e.target.value)} 
            />
          </label><br/>

          <label htmlFor='password'>
            <p>Password:</p>
            <input type='password'  placeholder='Enter password here' required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </label><br/><br/>

          <button onClick={handleLogin}
          className='btn btn-primary' >
            Login
          </button>
    </section>
  )
}

export default Login
