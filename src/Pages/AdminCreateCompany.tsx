import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminCreateCompany = () => {
    return (
        <>
            <div className='grid place-items-start md:px-60 md:mt-10 md:p-0 p-12'>
                <h1 className='font-bold font-serif text-[25px]'>Your Company Name</h1>
                <p className='font-serif font-medium'>What Would you like to give your Comapny name? you can change this later</p>

                <label className='mt-7 font-serif mb-2 text-[25px] font-medium'>Company Name</label>
                <input
                    type="email"
                    name='email'
                    placeholder='Filter by name'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                />
                <div className='mt-7'>
                    <NavLink to="/Company" >
                        <button className='ml-0 shadow shadow-gray-300 py-1.5 px-6 rounded-lg font-serif text-[20px]'>Cancel</button>
                    </NavLink>
                    <NavLink to="/AdminCompanysetupPage" >
                        <button className='ml-5 bg-gray-500 text-white py-1.5 px-6 rounded-lg font-serif text-[20px]'>Coutinue</button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminCreateCompany
