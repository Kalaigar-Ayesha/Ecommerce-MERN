import React from 'react'

const NewsLetterBox = () => {

    const onSUbmitHandler=(event)=>{
            event.preventDefault();
    }

  return (
    <div className='text-center mb-20'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Join our newsletter and be the first to receive exclusive deals, updates, and special offers straight to your inbox!</p>
        <form onSubmit={onSUbmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-md'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
            <button type='submit' className='bg-[#f3945d] text-white text-xs px-8 py-4 rounded-md'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox