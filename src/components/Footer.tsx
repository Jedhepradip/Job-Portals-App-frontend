import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { PiCopyright } from 'react-icons/pi';

const Footer:React.FC = () => {
  return (
    <>
      <hr className='h-1 w-full text-black mt-16' />
      <div className='md:px-24 px-4 mt-3'>
        <h1 className='font-bold text-[25px]'>Job Hunt</h1>
        <div className='flex'>
          <PiCopyright className='mt-1' />
          <span className='font-sans ml-2'>2024 Your Comany. All rights reserved</span>
        </div>
        <div className='flex justify-end items-center gap-8 text-[26px] md:px-10 p-3'>
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
        </div>
      </div>
    </>
  )
}

export default Footer
