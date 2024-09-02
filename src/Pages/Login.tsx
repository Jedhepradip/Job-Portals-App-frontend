import React from 'react'
import { NavLink } from 'react-router-dom'

const Login: React.FC = () => {


    return (
        <>
            <div className='grid grid-cols-1 place-items-center p-5'>
                <div className='px-5 py-5 shadow-lg shadow-gray-300 rounded-lg w-80'>
                    <h1 className='text-center font-medium font-serif text-[30px]'>Login</h1>
                    <form>
                        <div className='space-y-1'>                           
                            
                            <div>
                                <label className='block text-lg text-gray-700 font-semibold'>Email</label>
                                <input
                                    type="text"
                                    name='email'
                                    placeholder='PradipJedhe@gmail.com'
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none focus:border-transparent'
                                />
                            </div>
                    
                            <div>
                                <label className='block text-lg font-semibold text-gray-700'>Password</label>
                                <input
                                    type="text"
                                    name='password'
                                    placeholder='password'
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none'
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

                            <button type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 outline-none">Login</button>
                        </div>
                        <NavLink to={"/SignIn"}>
                            <h1 className='mt-2 text-[13px] px-1 font-medium'>Create New Account? <span className='text-blue-800 hover:underline'>
                                SignIn</span></h1>
                        </NavLink>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
