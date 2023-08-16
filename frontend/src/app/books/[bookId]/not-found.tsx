import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div>
      <p>Whoops we couldn't find the page you are looking for</p>
      <Link href={'/'}>Go Back Home</Link>
    </div>
  )
}

export default NotFound
