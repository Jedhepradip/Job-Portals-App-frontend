import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../App/store/store';
import { FetchingCompanyData } from '../App/Features/CompanySlice';
import { IoArrowBack } from 'react-icons/io5';

interface InputPostJobs {
    title: string,
    description: string,
    requirements: string,
    salary: string,
    location: string,
    jobtype: string,
    experienceLevel: string
    position: string
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

interface location {
    city: string;
}

const PostJobsAdmin: React.FC = () => {
    const [company, setCompanyname] = useState(String);
    const [location, setlocation] = useState(String);
    const [companies, setCompanies] = useState<CompanyData[]>([]);
    const [companyId, setCompanyId] = useState<string | null>(null);
    const Navigate = useNavigate();
    const Companyinfo = useSelector((state: RootState) => state.Company.Company)
    const dispatch: AppDispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<InputPostJobs>();

    useEffect(() => {
        dispatch(FetchingCompanyData())
    }, [dispatch])

    useEffect(() => {
        if (Companyinfo.length) {
            setCompanies(Companyinfo)
        }
    }, [Companyinfo])

    useEffect(() => {
        if (company.length) {
            const SearchCompany: CompanyData[] = companies.filter((e: CompanyData) => e.CompanyName.toLowerCase() == company.toLowerCase());
            setCompanyId(SearchCompany[0]._id)
        }
    }, [companies, company])

    const onsubmit: SubmitHandler<InputPostJobs> = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("requirements", data.requirements);
        formData.append("salary", data.salary);
        formData.append("location", location);
        formData.append("jobtype", data.jobtype);
        formData.append("position", data.position);
        formData.append("experienceLevel", data.experienceLevel);
        formData.append("companyName", company);

        if (!(companyId?.length)) {
            console.log("Error");
            toast.error(<div className='font-serif text-[15px] text-black'>{"Select The Company"}</div>)
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/Jobs/Admin/PostJobs/${companyId}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            });
            const JobsResponses = await response.data;
            if (response.status == 200) {
                console.log("User registered successfully", JobsResponses);
                toast.success(<div className='font-serif text-[15px] text-black'>{JobsResponses.message}</div>)
                setTimeout(() => {
                    Navigate("/AdminJons")
                }, 1800)
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
    }

    const locationdata: location[] = [
        {
            city: "Delhi NCR",
        },
        {
            city: "Bangalore",
        },
        {
            city: "Hyderabad",
        },
        {
            city: "Pune",
        },
        {
            city: "Chennai",
        },
        {
            city: "Mumbai",
        },
    ];

    return (
        <>
            <div className='grid place-items-center md:p-0 p-5'>
                <ToastContainer />
                <div className='grid grid-cols-1 shadow shadow-gray-300 rounded-lg'>
                    <div className='flex items-center gap-24 py-2 px-5'>
                        <NavLink to="/AdminJons" className='flex items-center text-gray-500 hover:text-gray-700'>
                            <IoArrowBack className='text-[25px]' />
                            <span className='ml-1.5 text-[20px] font-serif'>Back</span>
                        </NavLink>
                        <h1 className='text-center font-serif text-[30px]'>Jobs Post</h1>
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <table className='w-full'>
                            <div className='space-y-2.5 py-2 px-4'>
                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Title</label>
                                        <input {...register("title", {
                                            required: { value: true, message: "Title is required" }
                                        })}
                                            type="text"
                                            name='title'
                                            placeholder='Backend Developer'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.title && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.title.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Description</label>
                                        <input {...register("description", {
                                            required: { value: true, message: "Description is required" }
                                        })}
                                            type="text"
                                            name='description'
                                            placeholder='I need Backend Developer'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.description && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.description.message}
                                            </div>
                                        )}
                                    </td>
                                </tr>

                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Requirements</label>
                                        <input {...register("requirements", {
                                            required: { value: true, message: "Requirements is required" }
                                        })}
                                            type="text"
                                            name='requirements'
                                            placeholder='Node.js, React.js, express.js'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.requirements && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.requirements.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Salary <span className='text-[12px] text-gray-400'>(in LPA)</span></label>
                                        <input  {...register("salary", {
                                            required: { value: true, message: "Salary is required" }
                                        })}
                                            type="number"
                                            name='salary'
                                            placeholder='12 LPA'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.salary && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.salary.message}
                                            </div>
                                        )}
                                    </td>
                                </tr>

                                <tr className='flex items-center space-x-2'>


                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Experience Level <span className='text-[12px] text-gray-400'>(in Years)</span></label>
                                        <input {...register("experienceLevel", {
                                            required: { value: true, message: "Experience Level is required" }
                                        })}
                                            type="number"
                                            name='experienceLevel'
                                            placeholder='12 Years'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.experienceLevel && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.experienceLevel.message}
                                            </div>
                                        )}
                                    </td>

                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Job Type</label>
                                        <input {...register("jobtype", {
                                            required: { value: true, message: "Jobs Type is required" }
                                        })}
                                            type="text"
                                            name='jobtype'
                                            placeholder='Part Time'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.jobtype && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.jobtype.message}
                                            </div>
                                        )}
                                    </td>
                                </tr>

                                <tr className='flex items-center space-x-2'>

                                    <td className="w-[50%]">
                                        <select
                                            className="block w-full text-lg font-medium py-2 px-4 font-serif text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            onChange={(e) => setlocation(e.target.value)}
                                        >companies
                                            <option>Select A Location</option>
                                            {locationdata.map((val, index) => (
                                                <option value={val.city} key={index}>{val.city}</option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className="w-[50%]">
                                        <select
                                            className="block w-full text-lg font-medium py-2 px-4 font-serif text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            onChange={(e) => setCompanyname(e.target.value)}
                                        >companies
                                            <option>Select a Company</option>
                                            {companies.map((val, index) => (
                                                <option value={val.CompanyName} key={index}>{val.CompanyName}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>No Of Position</label>
                                        <input {...register("position", {
                                            required: { value: true, message: "No Of Position is required" }
                                        })}
                                            type="number"
                                            name='position'
                                            placeholder='12 Postions'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.position && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.position.message}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                                <div className='w-full flex justify-center items-center'>
                                    <button className='bg-black text-white py-1 w-full mt-2 rounded-lg font-serif text-[20px]'>Post New Jobs</button>
                                </div>
                            </div>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostJobsAdmin
