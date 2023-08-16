"use client"
import React from 'react';
import {saveAs} from "file-saver"

const GetFile = ({fileLink, name}:any) => {
    const download = () => {
        saveAs(`${fileLink}`, `download_${name}`)
      }
  return (
    <div>
      
      <button onClick={download} className='btn btn-primary w-fit'>
                Dowload Book
              </button>
    </div>
  )
}

export default GetFile
