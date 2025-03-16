import React from 'react';
import { assets } from '../assets/asserts';

const Hero = () => {
  return (
    <div className='relative flex flex-col sm:flex-row items-center justify-center min-h-[80vh] bg-gradient-to-r from-[#f3945d] to-[#FEB47B] text-white overflow-hidden'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10'>
        <div className='max-w-md text-center sm:text-left'>
          {/* Divider with Text */}
          <div className='flex items-center justify-center sm:justify-start gap-2 mb-6'>
            <div className='w-8 md:w-11 h-[2px] bg-white'></div>
            <p className='font-medium text-sm md:text-base uppercase tracking-widest'>Our Best Sellers</p>
            <div className='w-8 md:w-11 h-[2px] bg-white'></div>
          </div>

          {/* Main Heading */}
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6'>
            Exclusive New <span className='text-[#FFD700]'>Arrival</span>
          </h1>

          {/* Call to Action */}
          <div className='flex items-center justify-center sm:justify-start gap-2 mt-8'>
            <button className='px-6 py-2 bg-white text-[#FF7E5F] font-semibold text-sm md:text-base rounded-full hover:bg-[#FFD700] hover:text-white transition-colors duration-300'>
              Explore the Collection
            </button>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center relative z-10'>
        <img 
          className='w-full max-w-lg transform transition-transform duration-500 rounded-lg' 
          src={assets.hero_img} 
          alt="Exclusive New Arrival" 
        />
      </div>

      {/* Background Animation */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FF7E5F] to-transparent'></div>
        <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FEB47B] to-transparent'></div>
        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FF7E5F] to-transparent'></div>
      </div>
    </div>
  );
};

export default Hero;