import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../App/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FetchingJobsData } from '../App/Features/JobsSlice';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FeachingapplicationData } from '../App/Features/ApplicationSlice';
import { useNavigate } from 'react-router-dom';

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

interface applicantUser {
    job: Job[],
    applicant: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
    _id: string,
}

const JobsDetails: React.FC = () => {
    const [Jobsdefualt, SetupCompanyJobs] = useState<Job[]>([]);
    const [Application, SetApplication] = useState<applicantUser[]>([]);
    const JobsData: Job[] = useSelector((state: RootState) => state.Jobs.Jobs);
    const application: applicantUser[] = useSelector((state: RootState) => state.Applicants.applicant);
    const { id } = useParams<{ id: string }>();
    const [loadingOTP, setLoadingOTP] = useState(false); // For Send OTP button
    const dispatch: AppDispatch = useDispatch();
    const Navigate = useNavigate()

    useEffect(() => {
        dispatch(FetchingJobsData());
        dispatch(FeachingapplicationData());
    }, [dispatch, loadingOTP]);

    useEffect(() => {
        if (JobsData.length) {
            const FilterJobsById = JobsData.filter((e: Job) => e._id === id);
            SetupCompanyJobs(FilterJobsById);
        }
    }, [JobsData, id]);

    useEffect(() => {
        if (Jobsdefualt[0]?.applications.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const jobs: applicantUser[] = application.filter((e: any) => e.job?._id == id)         
            if (jobs.length) {
                SetApplication(jobs)
            }
        }

    }, [Jobsdefualt, application, id]);

    const hadnelApplyNow = async () => {
        setLoadingOTP(true)
        try {
            const token = localStorage.getItem('Token');
            if (!token) {
                toast.error(<div className='font-serif text-[15px] text-black'>No authentication token found</div>);
                Navigate("/Login")
                return;
            }        
            // const response = await axios.post(
            //     `http://localhost:8000/Application/ApplyJobs/${id}`,
            const response = await axios.post(
                `https://job-portal-app-backend-zm6q.onrender.com/Application/ApplyJobs/${id}`,
                {}, 
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            const Userapplyresponse = await response.data;
            if (response.status === 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{Userapplyresponse.message}</div>);
                setTimeout(() => {
                    setLoadingOTP(false)
                }, 2000);
                // setapplyJobs(Userapplyresponse.applyjobs.status);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setTimeout(() => {
                setLoadingOTP(false)
            }, 2000);
            if (error.response) {
                const errorMessage = error.response.data.message;

                if (error.response.status === 409 || errorMessage === 'User already exists') {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                }
            } else {
                console.log('Error: Network issue or server not responding', error);
            }
        }
    };

    return (
        <div className='grid grid-cols-1 place-items-center md:px-28 md:mt-10 p-6'>
            <ToastContainer />
            <div className='w-full'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold font-serif text-[30px]'>{Jobsdefualt[0]?.title.charAt(0)?.toUpperCase() + Jobsdefualt[0]?.title?.slice(1)}</h1>
                        <div className='flex gap-3 items-center mt-3'>
                            <h1 className='text-blue-800 px-2 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.position} Position</h1>
                            <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.jobtype}</h1>
                            <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{Jobsdefualt[0]?.salary} LPA</h1>
                        </div>
                    </div>
                    <div>
                        {Application.length > 0 ? (
                            <button className='md:py-1 text-white md:mt-5 md:px-4 px-2 py-2 mt-3 bg-gray-600 rounded-lg font-serif font-medium md:text-[20px] text-[15px]'>
                                Already Applied
                            </button>
                        ) : (
                            <div className="flex justify-center items-center">
                                <button
                                    type='button'
                                    onClick={hadnelApplyNow}
                                    className={`md:py-1 text-white md:mt-5 md:px-4 px-2 py-2 mt-3 bg-purple-900 rounded-lg font-serif font-medium md:text-[20px] text-[15px] flex items-center justify-center ${loadingOTP ? 'cursor-not-allowed' : ''}`}
                                    disabled={loadingOTP}
                                >
                                    {loadingOTP ? (
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white"
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
                                    ) : null}
                                    <span>{loadingOTP ? 'Loading...' : ' Apply Now'}</span>
                                </button>
                            </div>

                        )}

                    </div>
                </div>

                <div>
                    <h1 className='mt-[50px] text-[20px] font-bold'>Job Description</h1>
                    <hr className='h-[1px] w-full bg-black' />
                </div>

                <h1 className='font-bold mt-2'>Role: <span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.title.charAt(0)?.toUpperCase() + Jobsdefualt[0]?.title?.slice(1)}</span></h1>
                <h1 className='font-bold'>Location: <span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.location}</span></h1>
                <h1 className='font-bold'>Description: <span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.description}</span></h1>
                <h1 className='font-bold'>Requirements:
                    {Jobsdefualt[0]?.requirements?.map((val, index) => (
                        <span key={index} className='font-normal font-serif ml-3'>{val},</span>
                    ))}
                </h1>
                <h1 className='font-bold'>Experience: <span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.experienceLevel} Years</span></h1>
                <h1 className='font-bold'>Salary: <span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.salary} LPA</span></h1>
                <h1 className='font-bold'>Total Applicants: <span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.applications.length}</span></h1>
                <h1 className='font-bold'>Posted Date: <span className='font-normal px-3 font-serif'>{Jobsdefualt[0]?.updatedAt ? new Date(Jobsdefualt[0]?.updatedAt).toLocaleDateString() : 'N/A'}</span></h1>
            </div>
        </div>
    );
};

export default JobsDetails;