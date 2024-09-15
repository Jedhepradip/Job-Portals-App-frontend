import React, { useState, useEffect } from 'react'
import { RootState, AppDispatch } from '../App/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FetchingJobsData } from '../App/Features/JobsSlice';
import { useParams } from 'react-router-dom'

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

const JobsDetails: React.FC = () => {

    const [Jobsdefualt, SetupCompanyJobs] = useState<Job[]>([]);
    const JobsData = useSelector((state: RootState) => state.Jobs.Jobs);
    const { id } = useParams<{ id: string }>();

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchingJobsData())
    }, [dispatch])

    useEffect(() => {
        if (JobsData.length) {
            const FilterJobsById = JobsData.filter((e: Job) => e._id == id)
            SetupCompanyJobs(FilterJobsById)
        }
    }, [JobsData, id])

    return (
        <>
            {/* <div className='grid grid-cols-1 fixed inset-0 z-50 bg-white'> */}
            <div className='grid grid-cols-1 place-items-center md:px-28 md:mt-10 p-6'>

                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='font-bold font-serif  text-[30px]'>{Jobsdefualt[0]?.title}</h1>
                            <div className='flex gap-3 items-center mt-3'>
                                <h1 className='text-blue-800 px-2 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.position} Position </h1>
                                <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.jobtype}</h1>
                                <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.salary}LPA</h1>
                            </div>
                        </div>
                        <div>
                            <button className='md:py-1 text-white md:mt-5 md:px-4 px-2 py-2 mt-3 bg-purple-900 rounded-lg font-serif font-medium md:text-[20px] text-[15px]'>Apply Now</button>
                        </div>
                    </div>

                    <div>
                        <h1 className='mt-[50px] text-[20px] font-bold'>Jobs Description</h1>
                        <hr className='h-[1px] w-full bg-black' />
                    </div>

                    <h1 className='font-bold mt-2'>Role:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.title}</span></h1>
                    <h1 className='font-bold'>Location:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.location}</span></h1>
                    <h1 className='font-bold'>Description:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.description}</span></h1>
                    <h1 className='font-bold'>Experience:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.experienceLevel}Years</span></h1>
                    <h1 className='font-bold'>salary:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.salary}LPA</span></h1>
                    <h1 className='font-bold'>Total Applicants:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.applications.length}</span></h1>
                    <h1 className='font-bold'>Posted Date:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.updatedAt ? new Date(Jobsdefualt[0]?.updatedAt).toLocaleDateString() : 'N/A'}</span></h1>
                </div>
            {/* </div> */}
            </div>
        </>
    )
}

export default JobsDetails
