"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { book } from '../../../typings';
import { bookStore } from '../endpoint/bookStore';
import { BOOK } from '../endpoint/routes';





const Books =  () => {
  const [search, setSeacrch] = useState<string>('')
  const [newBooks, setNewBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
 

  const getBooks = async() => {
    try {
      const res = await bookStore.get(BOOK.GET_BOOKS);
      setNewBooks(res.data.books)
      setLoading(false)
    } catch (error:any) {
      setErrorMsg(error && "Books Not Found");
      setLoading(false)
    }
  }

  useEffect(() => {
    getBooks()
  },[])
  

  // fitter books
  const books = newBooks.filter(book => book.name.match(
    new RegExp(search, 'i')
  ));
  
  return (
    <section className='w-screen p-5 bg-black'>
      <input type='search' placeholder='Search Books by name' 
      value={search} onChange={e => setSeacrch(e.target.value)}
      />
     
     {loading? <p>Data is loading...</p>
     :errorMsg? <p>{errorMsg}</p>
     :(
      <ul className='flex flex-wrap justify-between w-56 gap-5 p-3 mx-auto mt-3 items-bottom lg:w-full'>
       {
        books.map(book => (
          <li key={book._id}
              className='p-1 border-2 rounded-xl w-52 h-max-48'
          >
            <a href={`/books/${book._id}`}>
            <Image alt='book' src={`/${book.photo}`}
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
     )
    }
      
    </section>
  )
}

export default Books
