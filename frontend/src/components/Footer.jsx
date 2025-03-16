import React from 'react';
import { assets } from '../assets/asserts';

const Footer = () => {
  return (
    <div className='w-full bg-gradient-to-r from-[#f56f21] to-[#f38028] text-white'>
      {/* Main Footer Content */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 py-10 px-5 sm:px-20 text-sm'>
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} className='mb-5 w-20' alt="Logo" />
          <p className='w-full text-white opacity-80'>
            Welcome to Elite, your ultimate destination for trendy and high-quality fashion. Explore our curated collections designed to elevate your style and make every moment special.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-white opacity-80'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-white opacity-80'>
            <li>+1-222-343-3534</li>
            <li>support@elite.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='w-full border-t border-white border-opacity-20'>
        <p className='py-5 text-sm text-center text-white opacity-80'>
          © 2025 Elite. All rights reserved. Designed to bring you the best in fashion.
        </p>
      </div>
    </div>
  );
};

export default Footer;
