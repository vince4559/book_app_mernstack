"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../public/logo.png'
import Image from 'next/image'
import menu from '../../public/menu-outline.svg'
import close from '../../public/close-outline.svg';
import { useRouter } from 'next/navigation'
import { useAppSelector} from './redux/hook'
import Logout from './components/Logout'
import UserDetails from './components/UserDetails'

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();


  const isloggedIn = useAppSelector((state) => state.authSlice.isLoggedIn) 
    // console.log(isloggedIn)

  const handleClick =() => {
    setOpen(!open)  
  };
  
  return (
    <header className='sticky top-0 bg-blue-950 w-max-screen'>
      <nav className='flex items-center justify-between px-4'>
        
        <div className='z-50 flex items-center justify-between w-full p-5 md:w-auto'>
          <Link href={'/'} >
              <Image src={logo} alt='logo' width={60} />
          </Link>

          <div className='md:hidden' onClick={handleClick}>
            <Image alt='menu' src={open? close : menu} width={40} height={50} />
          </div>
        </div>


        <ul className='items-center hidden gap-8 md:flex '>
          <li><Link href={'/'}>Home</Link></li>
          <li><Link href={'/books'}>Books</Link></li>
          <li><Link href={isloggedIn? '/addbook' : '/'}>Add Book</Link></li>
        </ul>

        
        <div className='hidden gap-5 md:flex'>
             {isloggedIn? <Logout /> : 
              <button onClick={() => router.push('/login')}  className='btn btn-primary'>
              Login
            </button>
             }
              {/* <button onClick={() => router.push('/signup')} className='btn btn-secondary'>
                SignUp
              </button> */}
              {isloggedIn && <UserDetails />}
        </div>


        {/* mobile */}
        
        <ul className={`md:hidden absolute w-full h-fit bottom-0 top-0 bg-slate-300 pl-5 py-24
          duration-500 flex flex-col gap-5 ${open? 'left-0' : 'left-[100%]'}`}>
          <li><a href={'/'}>Home</a></li>
          <li><a href={'/books'}>Books</a></li>
          <li><a href={isloggedIn? '/addbook' : '/'}>Add Book</a></li>

            <div className='flex flex-col gap-4 mt-5'>
            {isloggedIn? <Logout /> : 
              <a href='/login'> 
                <button className='btn btn-primary'>
              Login
            </button>
              </a>
             }
              <a href='/signup'>
                <button className='btn btn-secondary'>
                SignUp
              </button>
              </a>
              {isloggedIn && <UserDetails />}
          </div>
        </ul>
        
      </nav>
    </header>
  )
}

export default Header
