import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/asserts'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className='mb-20'>
      <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img  className='rounded-md w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
            <div className='flex flex-col justify-center items-start gap-6'>
              <p className='font-semibold text-gray-600 text-xl'>Our Store</p>
              <p className='text-gray-500'>Elite Bazaar Headquarters <br /> Downtown District, New York, NY 10001 <br />
              United States</p>
              <p className='text-gray-500'> Phone: +1 (555) 123-4567 <br /> Email:support@elitebazaar.com</p>
              

            </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact