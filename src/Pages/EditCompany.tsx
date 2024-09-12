/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../App/store/store'
import { FetchingCompanyData } from '../App/Features/CompanySlice'
import axios from 'axios'

interface InputForm {
    CompanyName: string,
    description: string,
    website: string,
    location: string,
    Logo: string;
}

interface CompanyData {
    _id: string;
    CompanyName: string;
    UserId: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    location: string;
    website: string;
    __v: number; // Add this field to match the MongoDB document structure
}

const EditCompany: React.FC = () => {

    const [file, setFile] = useState(String)
    const [companies, setCompanies] = useState<CompanyData[]>([]);
    const [filterComapny, SetCompanyFilter] = useState<CompanyData[]>([]);
    const { id } = useParams<{ id: string }>();

    const Navigate = useNavigate();

    const CompanuInfo = useSelector((state: RootState) => state.Company.Company)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchingCompanyData());
    }, [dispatch])

    useEffect(() => {
        if (CompanuInfo.length) {
            setCompanies(CompanuInfo)
        }
    }, [CompanuInfo])

    const CompanyFilter: any = companies.filter((e) => e._id === id)

    useEffect(() => {
        if (CompanyFilter.length) {
            SetCompanyFilter(CompanyFilter)
        }
    }, [CompanuInfo])

    const { register, handleSubmit } = useForm<InputForm>();

    const onsubmit: SubmitHandler<InputForm> = async (data) => {
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("CompanyName", data.CompanyName);
        formdata.append("description", data.description);
        formdata.append("website", data.website);
        formdata.append("location", data.location);

        console.log(data);


        try {
            const response = await axios.put(`http://localhost:8000/Company/UpdateCompany/${id}`, formdata, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            })
            const responsedata = await response.data;

            if (response.status === 200) {
                console.log("Company registered successfully company", responsedata);
                toast.success(<div className='font-serif text-[15px] text-black'>{responsedata}</div>);
                setTimeout(() => {
                    Navigate("/Company");
                }, 2000);
            }

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
    }

    return (
        <>
            <ToastContainer />
            <div className='grid grid-cols-1 place-items-center '>
                <div className='px-8 py-10 shadow-lg shadow-gray-300 rounded-lg bg-white mt-4 mb-10'>
                    <div className='flex items-center mb-6'>
                        <NavLink to="/CreateCompanyAdmin" className='flex items-center text-gray-500 hover:text-gray-700'>
                            <IoArrowBack className='text-[25px]' />
                            <span className='ml-1.5 text-[18px] font-serif'>Back</span>
                        </NavLink>
                        <h1 className='text-[30px] font-bold px-10 font-serif'><span className='font-serif text-[35px]'>C</span>ompany Edit</h1>
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className='space-y-4'>
                            <div className='flex flex-col md:flex-row md:space-x-4'>
                                <div className="w-full md:w-1/2">
                                    <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Company Name</label>
                                    <input {...register("CompanyName")}
                                        type="text"
                                        name='CompanyName'
                                        defaultValue={filterComapny[0]?.CompanyName}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black font-serif'
                                    />
                                </div>
                                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                    <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Description</label>
                                    <input {...register("description")}
                                        type="text"
                                        name='description'
                                        defaultValue={filterComapny[0]?.description}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black font-serif'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:space-x-4'>
                                <div className="w-full md:w-1/2">
                                    <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Website</label>
                                    <input {...register("website")}
                                        type="text"
                                        name='website'
                                        defaultValue={filterComapny[0]?.website}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black font-serif'
                                    />
                                </div>
                                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                    <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Location</label>
                                    <input {...register("location")}
                                        type="text"
                                        name='location'
                                        defaultValue={filterComapny[0]?.location}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black font-serif'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:space-x-4'>
                                <div className="w-full md:w-1/2">
                                    <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Logo</label>
                                    <input {...register("Logo")}
                                        type="file"
                                        name='Logo'
                                        className='w-full px-4 py-1 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none font-serif mb-1'
                                        onChange={(e) => setFile(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="px-5 py-2 rounded-lg text-[22px] font-serif text-white bg-black w-full mt-6 hover:bg-gray-800">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditCompany
