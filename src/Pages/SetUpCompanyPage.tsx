import React, { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SetUpCompanyPage: React.FC = () => {

    const [file, setFile] = useState(String)

    const Naviget = useNavigate();

    interface InputForm {
        name: string,
        Description: string,
        Website: string,
        Location: string,
        Logo: string;
    }

    const id: string = "1234";
    const { register, handleSubmit, formState: { errors } } = useForm<InputForm>();

    const onsubmit: SubmitHandler<InputForm> = async (data) => {
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("name", data.name);
        formdata.append("Description", data.Description);
        formdata.append("Website", data.Website);
        formdata.append("Location", data.Location);
        try {
            const response = await axios.put(`http://localhost:8000/UpdateCompany/${id}`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responsedata = await response.data;
            if (!response.data.ok) {
                console.log(responsedata);
            }
            if (response.data.ok) {
                console.log(responsedata);
                Naviget("/Company")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='grid grid-cols-1 place-items-center'>
                <div className='px-5 py-5 shadow-lg shadow-gray-300 rounded-lg'>
                    <div className='flex'>
                        <NavLink to="/AdminCreateCompany" >
                            <h1 className='flex text-[18px] mt-3 font-serif text-gray-500'><IoArrowBack className='text-[25px]' /><span className='ml-1.5 text-gray-500'>Back</span></h1>
                        </NavLink>
                        <h1 className='text-[30px] font-bold px-10 font-serif'><span className='font-serif text-[35px]'>C</span>ompany SetUp</h1>
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <table className="w-full mt-7">
                            <div className='space-y-3'>
                                <tr className='flex items-center space-x-4'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700  px-1'>Company Name</label>
                                        <input {...register("name", {
                                            required: { value: true, message: "Name is required" }
                                        })}
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.name && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.name.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Description</label>
                                        <input {...register("Description", {
                                            required: { value: true, message: "Description is required" }
                                        })}
                                            type="text"
                                            name='Description'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.Description && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Description.message}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                                <tr className='flex items-center space-x-4'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700  px-1'>Website</label>
                                        <input {...register("Website", {
                                            required: { value: true, message: "Website is required" }
                                        })}
                                            type="text"
                                            name='Website'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.Website && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Website.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Location</label>
                                        <input {...register("Location", {
                                            required: { value: true, message: "Location is required" }
                                        })}
                                            type="text"
                                            name='Location'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.Location && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Location.message}
                                            </div>
                                        )}
                                    </td>
                                </tr>

                                <tr className='flex items-center space-x-4'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 '>Logo</label>
                                        <input {...register("Logo", {
                                            required: { value: true, message: "Logo is required" }
                                        })}
                                            type="file"
                                            name='Logo'
                                            className='w-full px-4 py-1 border border-gray-300 rounded-md focus:ring-black focus:border-transparent outline-none font-serif mb-1' onChange={(e) => setFile(e.target.value)}
                                        />
                                        {errors.Logo && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Logo.message}
                                            </div>
                                        )}
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

export default SetUpCompanyPage
