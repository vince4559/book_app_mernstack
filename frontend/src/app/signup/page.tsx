"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React,{useState} from 'react'
import { baseUrl } from '../utils/constant';

const Signup = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter()

    const handleSignup = async(e:React.FormEvent) => {
      e.preventDefault();
      const url = `${baseUrl}/auth/signup`
      try {
        await axios.post(url, {name, email, password})
        console.log('signup successully')
        router.push('/login')
      } catch (err) {
        console.log(err)
      }
    };
    
  return (
    <section className='flex flex-col items-center justify-center gap-4 p-5 bg-black'>
       <p className='my-5 text-red-100'>Please up the forms below to signup</p>
        <form onSubmit={handleSignup} >                  
          <label htmlFor='name' className='mb-10'>
            <p>Name:</p>
            <input type='text' inputMode='text' placeholder='John Doe'  required
              value={name} onChange={(e) => setName(e.target.value)}             
            />
          </label><br/><br/>

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
            Signup
          </button>
        </form>
    </section>
  )
}

export default Signup
