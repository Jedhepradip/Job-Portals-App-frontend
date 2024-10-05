import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

interface InputFormLogin {
    email: string,
    password: string,
    role: string,
}
const Login: React.FC = () => {

    const [loadingOTP, setLoadingOTP] = useState(false); // For Send OTP button
    const { register, handleSubmit } = useForm<InputFormLogin>()
    const Navigate = useNavigate();

    const onsubmit: SubmitHandler<InputFormLogin> = async (data) => {
        setLoadingOTP(true)
        const formdata = new FormData()
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("role", data.role);
        try {            
            // const response = await axios.post("http://localhost:8000/User/login", formdata, {
                const response = await axios.post("https://job-portal-app-backend-zm6q.onrender.com/User/login", formdata, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const UserResponse = response.data;

            if (response.status === 200) {
                console.log("User registered successfully", UserResponse);
                toast.success(<div className='font-serif text-[15px] text-black'>{UserResponse.message}</div>);
                setTimeout(() => {
                    Navigate("/");
                    setLoadingOTP(false)
                    const Token = UserResponse.token;
                    localStorage.setItem("Token", Token);
                }, 1600);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                setTimeout(() => {
                    setLoadingOTP(false)
                }, 2000);
                const errorMessage = error.response.data.message;

                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    console.log("Error: ", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    }
    return (
        <>
            <div className='grid grid-cols-1 place-items-center p-5'>
                <ToastContainer />
                <div className='px-5 py-5 shadow-lg shadow-gray-300 rounded-lg w-80'>
                    <h1 className='text-center font-medium font-serif text-[30px]'>Login</h1>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className='space-y-1 font-serif'>
                            
                            <div>
                                <label className='block text-lg text-gray-700 font-medium'>Email</label>
                                <input {...register("email")}
                                    type="text"
                                    name='email'
                                    placeholder='PradipJedhe@gmail.com'
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none focus:border-transparent'
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-medium text-gray-700'>Password</label>
                                <input {...register("password")}
                                    type="password"
                                    name='password'
                                    placeholder='password'
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none'
                                />
                            </div>

                            <div className="flex items-center gap-4 p-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <input
                                        {...register("role", { required: "Please select a user type" })}
                                        type="radio"
                                        id="student"
                                        name='role'
                                        value="student"
                                        className="form-radio text-black focus:ring-black"
                                    />
                                    <label htmlFor="student" className="text-gray-700">Students</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        {...register("role", { required: "Please select a user type" })}
                                        type="radio"
                                        id="recruiter"
                                        value="recruiter"
                                        name='role'
                                        className="form-radio text-black focus:ring-black"
                                    />
                                    <label htmlFor="recruiter" className="text-gray-700">Recruiter</label>
                                </div>
                            </div>

                            <div className="w-full flex justify-center items-center pb-2">
                                <button
                                    type='submit'
                                    className={`mt-2 flex justify-center items-center text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-[20px] px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 outline-none font-serif ${loadingOTP ? 'cursor-not-allowed' : ''}`}
                                    disabled={loadingOTP}
                                >
                                    {loadingOTP && (
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white rounded-full"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                    )}
                                    <span>{loadingOTP ? 'Loading...' : 'Login'}</span>
                                </button>
                            </div>
                        </div>

                        <div className='flex'>
                            <NavLink to={"/SignIn"}>
                                <h1 className='mt-2 text-[13px] px-1 font-medium'>Create New Account? <span className='text-blue-800 hover:underline'>
                                    SignIn</span></h1>
                            </NavLink>
                            <NavLink to={"/ForgetPassword"} >
                                <h1 className='cursor-pointer text-[11px] mt-3 ml-5 hover:underline text-blue-700 font-medium'>Forget Password</h1>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
