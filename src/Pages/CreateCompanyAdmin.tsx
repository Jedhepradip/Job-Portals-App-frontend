/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CreateCompanyAdmin: React.FC = () => {

    const Navigate = useNavigate();
    interface Inputform {
        CompanyName: string;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<Inputform>();

    const onsubmit: SubmitHandler<Inputform> = async (data) => {
        // console.log(data);
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
                console.log(CompanyResponse);

                setTimeout(() => {
                    Navigate(`/SetUpCompanyPage/${CompanyResponse.Companystord._id}`)
                }, 2000)
            }
            else {
                Navigate("/CreateCompanyAdmin")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
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
                <h1 className='font-bold font-serif text-[25px]'>Your Company Name</h1>
                <p className='font-serif font-medium'>What Would you like to give your Comapny name? you can change this later</p>

                <form onSubmit={handleSubmit(onsubmit)} className='w-full'>
                    <label className='mt-7 font-serif mb-2 text-[25px] font-medium'>Company Name</label>
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

                    <div className='mt-7'>
                        <NavLink to="/Company" >
                            <button className='ml-0 shadow shadow-gray-300 py-1.5 px-6 rounded-lg font-serif text-[20px]'>Cancel</button>
                        </NavLink>
                        {/* <NavLink to="/AdminCompanysetupPage" > */}
                        <button type='submit' className='ml-5 bg-gray-500 text-white py-1.5 px-6 rounded-lg font-serif text-[20px] hover:bg-gray-900'>Coutinue</button>
                        {/* </NavLink> */}
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCompanyAdmin
