"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { book } from '../../../typings';
import { baseUrl } from '../utils/constant';
axios.defaults.withCredentials = true




const Books =  () => {
  const [search, setSeacrch] = useState<string>('')
  const [newBooks, setNewBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true)
  


  useEffect(() => {
    const URL = `${baseUrl}/books`;
    const fetchBooks =async () => {
      const res =await axios.get(URL)      
      setNewBooks(res.data.books)
      setLoading(false)
  }
  fetchBooks()
  },[newBooks])
  

  // fitter books
  const books = newBooks.filter(book => book.name.match(
    new RegExp(search, 'i')
  ));
  
  return (
    <section className='w-screen p-5 bg-black'>
      <input type='search' placeholder='Search Books by name' 
      value={search} onChange={e => setSeacrch(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <ul className='flex flex-wrap justify-between w-56 gap-5 p-3 mx-auto mt-3 items-bottom lg:w-full'>
       {
        books.map(book => (
          <li key={book._id}
              className='p-1 border-2 rounded-xl w-52 h-max-48'
          >
            <a href={`/books/${book._id}`}>
            <Image alt='book' src={`${baseUrl}/photos${book.photo}`}
                  width={300} height={200}
              />
                                
              <h4>{book.name}</h4>
              <p>
                Author: <span>{book.author}</span>
              </p>
              <p>
                Price: <span>${book.price}</span>
              </p> 
            </a>              
          </li>
      ))
       }       
  </ul>
    </section>
  )
}

export default Books
