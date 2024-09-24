import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../App/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FetchingJobsData } from '../App/Features/JobsSlice';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FeachingapplicationData } from '../App/Features/ApplicationSlice';
import { FetchingUserData } from '../App/Features/UserSlice';


interface applicantUser {
    job: Job[],
    applicant: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
    _id: string,
}

interface Job {
    _id: string;
    description: string;
    requirements: [];
    salary: string;
    location: string;
    jobtype: string;
    position: string;
    experienceLevel: string;
    companyName: string;
    company: string;
    CreatedBy: string;
    title: string;
    applications: applicantUser[];
    JobPostDate: string;
    createdAt: string;
    updatedAt: string;
    __v: string;
}


interface CompanyData {
    id: string;
    name: string;
    logo: string;
    // other fields...
}

interface JobPostData {
    _id: string;
    title: string;
    companyName: string
    // other fields...
}

interface UserInterfase1 {
    _id: string;
    ProfileImg: string;
    name: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    bio: string;
    skills: string[]; // assuming it's an array of skill strings
    ResumeFile: string;
    Company: CompanyData[]; // replace with actual Company structure
    JobPost: JobPostData[]; // replace with actual JobPost structure
    createdAt: string;
    updatedAt: string;
    __v: string;
}

interface ApplicationUser {
    id: number; // or string, depending on your use case
    // name: string;
    // email: string;
    // Add other properties as needed
}

const JobsDetails: React.FC = () => {
    const [Jobsdefualt, SetupCompanyJobs] = useState<Job[]>([]);
    const [Application, SetApplication] = useState<applicantUser[]>([]);
    const [ApplyJobs, setapplyJobs] = useState<string>('');
    const JobsData: Job[] = useSelector((state: RootState) => state.Jobs.Jobs);
    const user: UserInterfase1[] = useSelector((state: RootState) => state.User.User);
    // const application: applicantUser[] = useSelector((state: RootState) => state.Applicants.applicant);
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchingJobsData());
        dispatch(FeachingapplicationData())
        dispatch(FetchingUserData())
    }, [dispatch]);

    useEffect(() => {
        if (JobsData.length) {
            const FilterJobsById = JobsData.filter((e: Job) => e._id === id);
            SetupCompanyJobs(FilterJobsById);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JobsData]);

    if (Jobsdefualt[0]?.applications.length) {
        const applicationUsers: ApplicationUser[] = [];
        Jobsdefualt.forEach((val) => {
            const appyljob = val.applications.filter((e) => console.log(e, user._id))
        })
    }


    const hadnelApplyNow = async () => {
        try {
            const token = localStorage.getItem('Token');
            if (!token) {
                toast.error(<div className='font-serif text-[15px] text-black'>No authentication token found</div>);
                return;
            }
            const response = await axios.post(
                `http://localhost:8000/Application/ApplyJobs/${id}`,
                {}, // Request body (empty in this case)
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            const Userapplyresponse = await response.data;
            if (response.status === 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{Userapplyresponse.message}</div>);
                setapplyJobs(Userapplyresponse.applyjobs.status);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;

                if (error.response.status === 409 || errorMessage === 'User already exists') {
                    console.log('Error: User already exists.');
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    console.log('Error: ', errorMessage || 'Unexpected error occurred.');
                }
            } else {
                console.log('Error: Network issue or server not responding', error);
            }
        }
    };

    return (
        <>
            <div className='grid grid-cols-1 place-items-center md:px-28 md:mt-10 p-6'>
                <ToastContainer />
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='font-bold font-serif text-[30px]'>{Jobsdefualt[0]?.title}</h1>
                            <div className='flex gap-3 items-center mt-3'>
                                <h1 className='text-blue-800 px-2 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.position} Position </h1>
                                <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.jobtype}</h1>
                                <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.salary}LPA</h1>
                            </div>
                        </div>
                        <div>
                            {Application.length ?
                                <>
                                    <button className='md:py-1 text-white md:mt-5 md:px-4 px-2 py-2 mt-3 bg-gray-600 rounded-lg font-serif font-medium md:text-[20px] text-[15px]'>Already Applied</button>
                                </>
                                :
                                <>
                                    <button className='md:py-1 text-white md:mt-5 md:px-4 px-2 py-2 mt-3 bg-purple-900 rounded-lg font-serif font-medium md:text-[20px] text-[15px]' onClick={hadnelApplyNow}>Apply Now</button>
                                </>
                            }
                        </div>
                    </div>

                    <div>
                        <h1 className='mt-[50px] text-[20px] font-bold'>Jobs Description</h1>
                        <hr className='h-[1px] w-full bg-black' />
                    </div>

                    <h1 className='font-bold mt-2'>Role:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.title}</span></h1>

                    <h1 className='font-bold'>Location:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.location}</span></h1>

                    <h1 className='font-bold'>Description:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.description}</span></h1>

                    <h1 className='font-bold'>Experience:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.experienceLevel} Years</span></h1>

                    <h1 className='font-bold'>Salary:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.salary} LPA</span></h1>

                    <h1 className='font-bold'>Total Applicants:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.applications.length}</span></h1>

                    <h1 className='font-bold'>Posted Date:<span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.updatedAt ? new Date(Jobsdefualt[0]?.updatedAt).toLocaleDateString() : 'N/A'}</span></h1>
                </div>
            </div>
        </>
    );
};

export default JobsDetails;
