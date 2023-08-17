"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { book } from '../../../typings';
import { baseUrl } from '../utils/constant';


const initialData = {
  name:'',
  author:'',
  description: '',
  price: 0,
  available: false,
  photo: '',
  category:'',
  ebook:'',
};


const AddBook = () => {
  const [formData, setFormData] = useState<book|any>(initialData);
  // console.log(formData)
  const router = useRouter();
  
  // handleOnchange
  const handleOnchange = (e:React.FormEvent) => {
    const {name, value, type, checked}:any = e.target;
    setFormData({...formData, 
      [name]:type === 'checkbox' ? checked : value
    })
  };

  // handle image
  const handleImage = (e:React.FormEvent, index:number) => {
    const {files, name}:any = e.target;
    setFormData({...formData, [name]:files[index]})
  };

  const URL = `${baseUrl}/savebook`;
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const form =new FormData()
    form.append('photo', formData.photo)
    form.append('author', formData.author)
    form.append('available', formData.available)
    form.append('description', formData.description)
    form.append('name', formData.name)
    form.append('price', formData.price)
    form.append('category', formData.category)
    form.append('ebook', formData.ebook)
    
    axios.post(URL, form)
    .then((res) => {
      console.log(res.data)
      setFormData(initialData)
      router.push('/books')
    })
    .catch(err => console.log(err))
  }
  
  
  return (
    <section className="container max-w-screen bg-[url('../../public/book.PNG')]
      bg-contain bg-top bg-blend-multiply bg-slate-600
    ">
      <h1>Add Book To Book Store</h1>
      
      <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>
        <label htmlFor='name'>
          <p>Book Name:</p>
          <input type='text' name='name' placeholder='Book Name' required
            inputMode='text' value={formData.name} onChange={handleOnchange}
          />
        </label>

        <label htmlFor='Author'>
          <p>Author Name:</p>
          <input type='text' name='author' placeholder='Author Name' required
            inputMode='text' value={formData.author} onChange={handleOnchange}
          />
        </label>

        <label htmlFor='description'>
          <p>Book Description:</p>
          <textarea  required  name='description' placeholder='book decription here'
            inputMode='text' value={formData.description} onChange={handleOnchange}
          />
        </label>

        <label htmlFor='price'>
          <p>Price:</p>
          <input type='text' name='price' placeholder='price'  required
            inputMode='numeric' value={formData.price} onChange={handleOnchange}
          />
        </label><br/>
          <span className='mx-2'>Available</span>
        <label htmlFor='available'>
          <input type='checkbox' name='available' required
            inputMode='none' checked={formData.available} onChange={handleOnchange}
          />
        </label>

        <label htmlFor='Category'>
          <p>Book Category:</p>
          <input type='text' name='category' placeholder='category' required
            inputMode='text' value={formData.category} onChange={handleOnchange}
          />
        </label>

        <label htmlFor='upload photo'>
          <p>Book image:</p>
          <input type='file' name='photo'  required accept='image/*' 
            inputMode='none'  onChange={(e) =>handleImage(e,0)}
          />
        </label>

        <label htmlFor='upload Ebook'>
          <p>Ebook:</p>
          <input type='file' name='ebook'   
            inputMode='none'  onChange={(e) =>handleImage(e,0)}
          />
        </label>
        
         <br /> <br/>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </section>
  )
}

export default AddBook
