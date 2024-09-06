import React from 'react'
import { NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCompanyAdmin: React.FC = () => {

    const Navigate = useNavigate();
    interface Inputform {
        name: string;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<Inputform>();

    const onsubmit: SubmitHandler<Inputform> = async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/registration", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responsedata = await response.data;
            if (!responsedata.ok) {
                console.log(response.status);
            }
            if (response.data.ok) {
                console.log(responsedata);
                Navigate("/AdminCompanysetupPage")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='grid place-items-start md:px-60 md:mt-10 md:p-0 p-12'>
                <h1 className='font-bold font-serif text-[25px]'>Your Company Name</h1>
                <p className='font-serif font-medium'>What Would you like to give your Comapny name? you can change this later</p>

                <form onSubmit={handleSubmit(onsubmit)} className='w-full'>
                    <label className='mt-7 font-serif mb-2 text-[25px] font-medium'>Company Name</label>
                    <input {...register("name", {
                        required: { value: true, message: "Name is required" }
                    })}
                        type="text"
                        name='name'
                        placeholder='Filter by name'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                    />
                    {errors.name && (
                        <div className="text-red-500 text-lg font-serif mt-0">
                            {errors.name.message}
                        </div>
                    )}

                    <div className='mt-7'>
                        <NavLink to="/Company" >
                            <button className='ml-0 shadow shadow-gray-300 py-1.5 px-6 rounded-lg font-serif text-[20px]'>Cancel</button>
                        </NavLink>
                        {/* <NavLink to="/AdminCompanysetupPage" > */}
                        <button type='submit' className='ml-5 bg-gray-500 text-white py-1.5 px-6 rounded-lg font-serif text-[20px]'>Coutinue</button>
                        {/* </NavLink> */}
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCompanyAdmin
