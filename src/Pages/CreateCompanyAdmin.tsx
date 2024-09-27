/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface Inputform {
    CompanyName: string;
}

const CreateCompanyAdmin: React.FC = () => {

    const Navigate = useNavigate();
    const [loadingOTP, setLoadingOTP] = useState(false); // For Send OTP button
    const { register, handleSubmit, formState: { errors } } = useForm<Inputform>();

    const onsubmit: SubmitHandler<Inputform> = async (data) => {
        setLoadingOTP(true)
        const Token = localStorage.getItem("Token")
        console.log(Token);
        try {
            const response = await axios.post("http://localhost:8000/Company/Register/Admin/Company", data, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${Token}`,
                }
            })

            const CompanyResponse = response.data;

            if (response.status == 200) {
                console.log("User registered successfully", CompanyResponse);
                toast.success(<div className='font-serif text-[15px] text-black'>{CompanyResponse.message}</div>)
                setTimeout(() => {
                    setLoadingOTP(false)
                    Navigate(`/SetUpCompanyPage/${CompanyResponse.Companystord._id}`)
                }, 2000)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setTimeout(() => {
                setLoadingOTP(false)
            }, 2000)
            if (error.response) {
                const errorMessage = error.response.data.message;
                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>)
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>)
                    console.log("Error pp: ", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    };

    return (
        <>
            <div className='grid place-items-start md:px-60 md:mt-10 md:p-0 p-12'>
                <ToastContainer />
                <h1 className='font-medium font-serif text-[30px]'>Your Company Name</h1>
                <p className='font-serif font-medium mb-2'>What Would you like to give your Comapny name? you can change this later</p>

                <form onSubmit={handleSubmit(onsubmit)} className='w-full'>
                    <label className='mt-7 font-serif mb-2 text-[23px] font-medium'>Company Name</label>
                    <input {...register("CompanyName", {
                        required: { value: true, message: "Name is required" }
                    })}
                        type="text"
                        name='CompanyName'
                        placeholder='Filter by name'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                    />
                    {errors.CompanyName && (
                        <div className="text-red-500 text-lg font-serif mt-0">
                            {errors.CompanyName.message}
                        </div>
                    )}                   

                    <div className='mt-7 flex'>
                        <NavLink to="/Company">
                            <button className='ml-0 shadow shadow-gray-300 py-1.5 px-6 rounded-lg font-serif text-[20px]'>
                                Cancel
                            </button>
                        </NavLink>

                        <div className='flex ml-5'>
                            <button
                                type='submit'
                                className={`bg-gray-500 text-white py-1.5 px-6 rounded-lg font-serif text-[20px] hover:bg-gray-900 flex ${loadingOTP ? 'cursor-not-allowed' : ''}`}
                                disabled={loadingOTP}
                            >
                                {loadingOTP ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 mt-1 text-white"
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
                                ) : null}
                                <span>{loadingOTP ? 'Loading...' : 'Continue'}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCompanyAdmin
