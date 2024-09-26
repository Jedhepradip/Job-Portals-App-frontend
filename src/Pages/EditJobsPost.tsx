import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../App/store/store';
import { FetchingJobsData } from '../App/Features/JobsSlice';
import { IoArrowBack } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

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

interface Job {
    _id: string,
    description: string,
    requirements: [],
    salary: string,
    location: string,
    jobtype: string,
    position: string,
    experienceLevel: string,
    companyName: string,
    company: string,
    CreatedBy: string,
    title: string,
    applications: [],
    JobPostDate: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
}

interface location {
    city: string;
}

const EditJobsPost: React.FC = () => {
    const [location, setlocation] = useState(String);
    const [CompanyJobs, SetupCompanyJobs] = useState<Job[]>([]);
    const [Jobsdefualt, setJobdDefualt] = useState<Job[]>([]);
    const [loadingOTP, setLoadingOTP] = useState(false); // For Send OTP button
    const { id } = useParams<{ id: string }>();
    const Navigate = useNavigate();
    const JobsData = useSelector((state: RootState) => state.Jobs.Jobs)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchingJobsData())
    }, [dispatch])

    useEffect(() => {
        SetupCompanyJobs(JobsData)
    }, [JobsData])


    useEffect(() => {
        const FilterJobsData: Job[] = CompanyJobs.filter((e: Job) => e._id == id)
        setJobdDefualt(FilterJobsData)
    }, [CompanyJobs, id])

    const { register, handleSubmit } = useForm<InputPostJobs>();
    const onsubmit: SubmitHandler<InputPostJobs> = async (data) => {
        setLoadingOTP(true)
        data.requirements.split(" ")
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("requirements", data.requirements);
        formData.append("salary", data.salary);
        formData.append("location", location);
        formData.append("jobtype", data.jobtype);
        formData.append("position", data.position);
        formData.append("experienceLevel", data.experienceLevel);

        try {
            const response = await axios.put(`http://localhost:8000/Jobs/Admin/Jobs/Update/${id}`, formData, {
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
                    setLoadingOTP(false)
                    Navigate("/AdminJons")
                }, 2000)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setTimeout(() => {
                setLoadingOTP(false)
            }, 2000);
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
            <div className='grid place-items-center'>
                <ToastContainer />
                <div className='grid grid-cols-1 shadow shadow-gray-300 rounded-lg'>
                    <div className='flex items-center gap-24 py-2 px-5'>
                        <NavLink to="/AdminJons" className='flex items-center text-gray-500 hover:text-gray-700'>
                            <IoArrowBack className='text-[25px]' />
                            <span className='ml-1.5 text-[20px] font-serif'>Back</span>
                        </NavLink>
                        <h1 className='text-center font-serif text-[30px]'>Jobs Edit</h1>
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <table className='w-full'>
                            <div className='space-y-2.5 py-2 px-4'>
                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Title</label>
                                        <input {...register("title")}
                                            type="text"
                                            name='title'
                                            defaultValue={Jobsdefualt[0]?.title}
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />

                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Description</label>
                                        <input {...register("description")}
                                            type="text"
                                            name='description'
                                            defaultValue={Jobsdefualt[0]?.description}
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr>

                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Requirements</label>
                                        <input {...register("requirements")}
                                            type="text"
                                            name='requirements'
                                            defaultValue={Jobsdefualt[0]?.requirements}
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Salary <span className='text-[12px] text-gray-400'>(in LPA)</span></label>
                                        <input  {...register("salary")}
                                            type="number"
                                            name='salary'
                                            defaultValue={Jobsdefualt[0]?.salary}
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
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
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Job Type</label>
                                        <input {...register("jobtype")}
                                            type="text"
                                            name='jobtype'
                                            defaultValue={Jobsdefualt[0]?.jobtype}
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Experience Level <span className='text-[12px] text-gray-400'>(in Years)</span></label>
                                        <input {...register("experienceLevel")}
                                            type="number"
                                            name='experienceLevel'
                                            defaultValue={Jobsdefualt[0]?.experienceLevel}
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>No Of Position</label>
                                        <input {...register("position")}
                                            type="number"
                                            name='position'
                                            defaultValue={Jobsdefualt[0]?.position}
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />

                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Company Name</label>
                                        <span
                                            className="block w-full text-lg font-medium py-1.5 px-4 font-serif text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                                            <span>{Jobsdefualt[0]?.companyName}</span>
                                        </span>
                                    </td>
                                </tr>                             

                                <div className="w-full flex justify-center items-center pb-2">
                                    <button
                                        type='submit'
                                        className={`bg-black text-white py-1.5 w-full mt-2 rounded-lg font-serif text-[20px] flex justify-center items-center ${loadingOTP ? 'cursor-not-allowed' : ''}`}
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
                                        <span>{loadingOTP ? 'Loading...' : 'Jobs Update'}</span>
                                    </button>
                                </div>
                                
                            </div>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditJobsPost
