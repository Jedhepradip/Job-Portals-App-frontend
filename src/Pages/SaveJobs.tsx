import React, { useState, useEffect } from 'react'
import { FaRegBookmark } from 'react-icons/fa'
import { RootState, AppDispatch } from '../App/store/store'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { FetchingUserData } from '../App/Features/UserSlice'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    company: string | any,
    CreatedBy: string,
    title: string,
    applications: [],
    JobPostDate: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
}

const SaveJobs: React.FC = () => {
    const [Jobsdefualt, SetupCompanyJobs] = useState<Job[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Userdata:any = useSelector((state: RootState) => state.User.User)
    const dispatch: AppDispatch = useDispatch();
    
    useEffect(() => {
        dispatch(FetchingUserData())
    }, [dispatch])

    useEffect(() => {
        if (Userdata) {
            console.log("Userdata :", Userdata);
            SetupCompanyJobs(Userdata.SaveJobs)
        }
    }, [Userdata])

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) {
            return 'Invalid date';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        if (isToday(date)) {
            return 'Today';
        } else if (isYesterday(date)) {
            return 'Yesterday';
        } else {
            return formatDistanceToNow(date, { addSuffix: true });
        }
    };

    return (
        <>
            <h1 className='px-20 font-bold text-[30px] mt-10'>Save Jobs({Jobsdefualt?.length})</h1>
            <div className='md:col-span-9 col-span-12 bg-white shadow-gray-300 p-5 rounded-lg px-20'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12 grid md:grid-cols-3 gap-5 '>

                        {Jobsdefualt?.map((val, index) => (
                            <div key={index} className='py-3 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-10'>

                                <div className='flex justify-between items-center mb-3'>
                                    <h1 className='font-medium text-[15px]'>{formatDate(val.createdAt)}</h1>
                                    <div className='h-8 w-8 flex justify-center items-center p-1 bg-gray-100  rounded-full'>
                                        <FaRegBookmark className='text-[18px]' />
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div>
                                        <img src={`http://localhost:8000/${val.company?.CompanyLogo}`} alt="Company Logo" className='h-12 w-12 rounded-lg object-cover' />
                                    </div>
                                    <div className='px-3'>
                                        <h1 className='font-sans font-bold text-[14px]'>{val.companyName}</h1>
                                        <h1 className='font-sans text-[11px] text-gray-500'>{val.location}</h1>
                                    </div>
                                </div>
                                <h1 className='py-1 font-bold text-[19px]'>{val.title}</h1>
                                <p className='font-sans'>{val.description}</p>

                                <div className='flex justify-between items-center mt-3'>
                                    <h1 className='text-blue-800 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{val.position}Postion</h1>
                                    <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{val.jobtype}</h1>
                                    <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{val.salary}LPA</h1>
                                </div>

                                <div className='mt-3'>

                                    <NavLink to={`/JobsDetails/${val._id}`} >
                                        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Details</button>
                                    </NavLink>

                                    <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save For Later</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default SaveJobs
