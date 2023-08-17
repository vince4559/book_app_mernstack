import axios from 'axios'
import React from 'react'
import { book } from '../../../../typings';
import Format_currrency from '@/app/components/Format_currrency';
import Image from 'next/image';
import DeleteBook from '../DeleteBook';
import { notFound } from 'next/navigation';
import GetFile from '@/app/components/GetFile';
import { baseUrl } from '@/app/utils/constant';


interface idBook{
    params:{
        bookId:string
    }
}

const fetchBook =async (bookId:string) => {
    const URL = `${baseUrl}/books/${bookId}`
    const res = await axios.get(URL)
    const book:book = await res.data.book
    return book
};


const page = async ({params:{bookId}}:idBook) => {
    const book  = await fetchBook(bookId);
    if(!book._id) return notFound();
    const {name, author, description, category, photo, available, price, _id} = book
    // console.log(book)


    
    
  return (
    <div className='flex flex-col items-center w-screen gap-5 p-10 mx-auto bg-black'>
       <div className='flex flex-col gap-3 p-3'>
                <h2>{name.toUpperCase()}</h2>
                <h3><span>Book By</span>:  {author.toUpperCase()}</h3>
                <p><span>Description</span>: {description}</p>
                <p><span>Available</span>: {available? 'inStock' : 'out of stock'}</p>
                <p><span>Price</span>: {Format_currrency(price)}</p>
                <p><span>Book Category</span>: {category}</p>         
       </div>
        <Image src={`${baseUrl}/photos/${photo}`} 
            width={300} height={300} alt='photo' />

                
                <GetFile name={name} fileLink={`${baseUrl}/photos/${book.ebook}`} />
                
            <DeleteBook bookId={_id} />
    </div>
  )
}

export default page
