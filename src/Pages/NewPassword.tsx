import React from 'react'
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

interface IFormInput {
    password: string,
    cpassword: string
}
const NewPassword: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit } = useForm<IFormInput>()
    const Navigate = useNavigate();

    const onsubmit: SubmitHandler<IFormInput> = async (data) => {
        if (data.password == data.cpassword) {
            const formdata = new FormData()
            formdata.append("password", data.password)
            try {
                const response = await axios.put(`http://localhost:8000/ForgetPassword/Create/NewPassword/${id}`, formdata, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const CreatedPassword = response.data
                if (response.status === 200) {
                    toast.success(<div className='font-serif text-[15px] text-black'>{CreatedPassword.message}</div>);
                    setTimeout(() => {
                        Navigate("/Login")
                    }, 1700)
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.response) {
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
        } else {
            toast.error(<div className='font-serif text-[15px] text-black'>{"Password don't match"}</div>);
            return;
        }
    }

    return (
        <>
            <div className='grid grid-cols-1 place-items-center p-5'>
                <ToastContainer />
                <div className='px-5 py-5 shadow-lg shadow-gray-300 rounded-lg w-80'>
                    <h1 className='text-center font-medium font-serif text-[27px]'>Create New Password</h1>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className='space-y-1 font-serif'>
                            <div>
                                <label className='block text-lg text-gray-700 font-medium'>Password</label>
                                <input {...register("password")}
                                    type="text"
                                    name='password'
                                    placeholder='password'
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none focus:border-transparent mb-2'
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-medium text-gray-700'>CPassword</label>
                                <input {...register("cpassword")}
                                    type="password"
                                    name='cpassword'
                                    placeholder='cpassword'
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none mb-2'
                                />
                            </div>
                            <button type="submit" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-[20px] px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 outline-none">Update Password</button>

                            <div className='flex justify-between'>
                                <NavLink to={"/ForgetPassword"}>
                                    <h1 className='mt-2 text-[13px] px-1 font-medium'>Send OTP<span className='text-blue-800 hover:underline ml-1'>
                                        Email</span></h1>
                                </NavLink>

                                <NavLink to={"/Login"}>
                                    <h1 className='mt-2 text-[13px] px-1 font-medium text-blue-700 hover:underline'>Login</h1>
                                </NavLink>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewPassword
