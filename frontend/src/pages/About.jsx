import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/asserts'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className='mb-20'>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='rounded-md w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Elite is more than just an online store – it's a lifestyle. We believe in delivering excellence, from top-tier fashion to premium accessories. </p>
          <p> Why settle for ordinary when you can have extraordinary? we bring you handpicked fashion, unbeatable deals, and the hottest trends.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
          Our mission is to provide you with luxury, comfort, and sophistication at your fingertips. With seamless shopping, fast shipping, and exceptional customer service, we make sure you experience nothing but the best.
          </p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Quality Assurance</b>
              <p className='text-gray-600'>we ensure premium quality with rigorous testing, top-tier materials, and customer satisfaction for a flawless shopping experience. </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convenience:</b>
              <p className='text-gray-600'>Shop effortlessly at Elite Bazaar with a seamless experience, fast shipping, secure payments, and 24/7 support—because convenience is our priority!  </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional Customer Service</b>
              <p className='text-gray-600'>Experience exceptional customer service at Elite Bazaar – fast responses, hassle-free returns, and a dedicated team ensuring your satisfaction. </p>
          </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About