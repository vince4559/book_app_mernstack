"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import myLib from '../../public/lib.jpg'



const HomePage = () => {
  const router = useRouter()
  return (
    <main className="h-full bg-black max-w-screen">
      <div className="grid gap-4 p-7 lg:grid-cols-2">
        {/* grid 0ne */}
          <div className='mt-5'>
            <h1 className='mb-10 text-center'>Unlimiteed Access to 100k+ Books and Resources</h1>
            <p className='text-amber-500'>
              The more that you read, the more things you will know. The more that you learn, the more places you will go. Books are a uniquely portable magic. I kept always two books in my pocket, one to read, one to write in.
            </p>

            <p className='my-10 text-red-300'>
              <strong>Disclaimer:</strong> You must be logged in before you can add a book
            </p>
            
            <div className='flex items-center justify-center gap-6 mt-14'>
            <button onClick={() => router.push('/login')}  className='btn btn-primary'>
              Login
            </button>
              <button onClick={() => router.push('/signup')} className='btn btn-secondary'>
                SignUp
              </button>
            </div>
          </div>
          
          {/* grid two */}
          <div className='flex justify-center mt-5'>
            <Image alt='libarian' src={myLib} width={500} height={500}
              className='rounded-lg'
            />
          </div>
      </div>

      {/* section two */}
      <div className='grid gap-10 mt-10 lg:grid-cols-3 p-7'>
        <div>
          <h2> Read Comfortable From Anywhere </h2>           
          <p className='my-5'>
            I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.
          </p>
        </div>
        
        <div className='flex flex-col items-start justify-center'>
            <h3 >Reading Statistic</h3>
            <p >I guess there are never enough books.</p>
        </div>
        
        <div className='flex flex-col items-start justify-center'>
            <h3>Easier access to library</h3>
            <p >There is more treasure in books than in all the pirate loot on Treasure Island.</p>
        </div>
      </div>
    </main>
  )
}

export default HomePage
