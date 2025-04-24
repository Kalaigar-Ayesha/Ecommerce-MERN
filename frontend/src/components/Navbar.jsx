import React, { useContext, useState } from 'react'
import { assets } from '../assets/asserts.js'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { setShowSearch, getCartCnt, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium relative z-50'>
      <Link to='/'><img src={assets.logo} className='w-20' alt="" /></Link> 

      {/* Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {["Home", "Collection", "About", "Contact"].map((item, index) => (
          <NavLink key={index} to={`/${item.toLowerCase()}`} className='flex flex-col items-center gap-1'>
            <p>{item}</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 mx-auto hidden' />
          </NavLink>
        ))}
      </ul>

      {/* Icons (Search, Profile, Cart) */}
      <div className='flex items-center gap-8'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        {/* Profile Icon with Dropdown */}
        {!token ? (
          <Link to={'/login'}>  
            <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
          </Link>
        ) : (
          <div className='group relative'>
            <img onClick={()=>token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
            {/* drop down */}
           {token && 
            <div className='absolute right-0 hidden group-hover:flex flex-col bg-slate-100 text-gray-500 rounded shadow-md w-36 px-5 py-3'>
            
            <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
          </div>
          }
          </div>
        )}

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCnt()}
          </p>
        </Link>
        
        {/* Mobile Menu Icon */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white transition-transform transform ${visible ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          {["Home", "Collection", "About", "Contact"].map((item, index) => (
            <NavLink key={index} onClick={() => setVisible(false)} className='py-2 pl-6 border' to={`/${item.toLowerCase()}`}>{item}</NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar;
