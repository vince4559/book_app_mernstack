"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { baseUrl } from '../utils/constant';

const DeleteBook = ({bookId}:string|any) => {
    const router = useRouter()
    const URL = `${baseUrl}/api/deletebook/${bookId}`;
    
    const handleDelete =async () => {
        await axios.delete(URL)
        .then(() => {
            console.log('Delete succesfull')
            router.push('/books')
            router.refresh()
        })
        .catch(() => console.log('Error occured'))
    };
    
  return (
    <div>
      <button onClick={handleDelete}  className='btn-secondary btn'>
            Delete Book
      </button>   
    </div>
  )
}

export default DeleteBook
