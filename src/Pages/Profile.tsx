import React from 'react'
import png from "../assets/profile img.jpg"
import { FiEdit2 } from 'react-icons/fi'
const Profile: React.FC = () => {
    return (
        <>
            <div className="grid place-items-center">
                <div className="p-10 shadow shadow-gray-200  ">
                    <div className='flex'>
                        <img src={png} alt="" className='h-20 w-20 mt-3 rounded-full' />
                        <div className='px-3'>
                            <div className='h-7 w-10 ml-96 shadow shadow-gray-200 bg-white rounded-md flex justify-center items-center'>
                                <FiEdit2 className='text-[20px]'/>
                            </div>
                            <h1 className='font-bold'>Nilesh </h1>
                            <p className='font-serif'>Lorem ipsum dolor sit amet consectetur </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile
