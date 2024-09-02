import React from 'react'
import { NavLink } from 'react-router-dom'

const SignIn: React.FC = () => {


    return (
        <>
            <div className='grid grid-cols-1 place-items-center'>
                <div className='px-5 py-5 shadow-lg shadow-gray-300 rounded-lg'>
                    <h1 className='text-center font-medium font-serif text-[30px]'>SignIn</h1>
                    <form>
                        <div className='space-y-1'>
                            <div>
                                <label className='block text-lg font-medium text-gray-700 mb-1'>Profile</label>
                                <input
                                    type="file"
                                    name='profile'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-medium text-gray-700 mb-1'>Full Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder='Pradip Jedhe'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-medium text-gray-700 mb-1'>Email</label>
                                <input
                                    type="text"
                                    name='email'
                                    placeholder='PradipJedhe@gmail.com'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-medium text-gray-700 mb-1'>Phone</label>
                                <input
                                    type="text"
                                    name='phone'
                                    placeholder='91+ 8459844605'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-medium text-gray-700 mb-1'>Password</label>
                                <input
                                    type="text"
                                    name='Password'
                                    placeholder='Password'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                />
                            </div>

                            <div className="flex items-center gap-4 p-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <input type="radio" name="userType" id="student" className="form-radio text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="student" className="text-gray-700 font-medium">Students</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="radio" name="userType" id="recruiter" className="form-radio text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="recruiter" className="text-gray-700 font-medium">Recruiter</label>
                                </div>
                            </div>

                            <button type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
                        </div>
                        <NavLink to={"/Login"}>
                            <h1 className='mt-2 text-[13px] px-1 font-medium'>Already Have an Account? <span className='text-blue-800 hover:underline'>
                                Login</span></h1>
                        </NavLink>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn
