import React, { useState, useEffect } from 'react'
import { RootState, AppDispatch } from '../App/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FetchingJobsData } from '../App/Features/JobsSlice';

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

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchingJobsData())
    }, [dispatch])

    useEffect(() => {
        if (JobsData.length) {
            SetupCompanyJobs(JobsData)
        }
    }, [JobsData])

    console.log(Jobsdefualt);
    return (
        <>
            <div className='grid grid-cols-2 bg-red-500'>
                <h1>Backend Devloper</h1>
            </div>
        </>
    )
}

export default JobsDetails
