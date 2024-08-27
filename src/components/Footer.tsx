import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaCuttlefish } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <hr className='h-1 w-full text-black mt-16' />
      <div className='px-24 mt-3'>
        <h1 className='font-bold'>Job Hunt</h1>
        <FaCuttlefish/>
        <span className='font-sans'>2024 Your Comany. All rights reserved</span>
        <div className='flex  justify-end items-center gap-8 px-10 text-[25px] py-5'>
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
        </div>
      </div>
    </>
  )
}

export default Footer
