import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

const AdminCompanyEditForm = () => {
    return (
        <>
            <div className='grid grid-cols-1 place-items-center'>
                <div className='px-5 py-5 shadow-lg shadow-gray-300 rounded-lg'>
                    <div className='flex'>
                        <NavLink to="/Company" >
                            <h1 className='flex text-[18px] mt-3 font-serif text-gray-500'><IoArrowBack className='text-[25px]' /><span className='ml-1.5 text-gray-500'>Back</span></h1>
                        </NavLink>
                        <h1 className='text-[30px] font-bold px-10 font-serif'><span className='font-serif text-[35px]'>E</span>dit Company</h1>
                    </div>
                    <form>
                        <table className="w-full mt-7">
                            <div className='space-y-3'>
                                <tr className='flex items-center space-x-4'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700  px-1'>Company Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Description</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr>
                                <tr className='flex items-center space-x-4'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700  px-1'>Website</label>
                                        <input
                                            type="text"
                                            name='Website'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Location</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr>

                                <tr className='flex items-center space-x-4'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 '>Logo</label>

                                        <input
                                            type="file"
                                            name='profile'
                                            className='w-full px-4 py-1 border border-gray-300 rounded-md focus:ring-black focus:border-transparent outline-none font-serif mb-1'
                                        />
                                    </td>
                                </tr>
                            </div>
                        </table>
                        <button type="submit" className="px-5 py-1 rounded-lg text-[22px] font-serif text-white bg-black w-full mt-3">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminCompanyEditForm
