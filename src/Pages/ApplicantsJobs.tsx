import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { HiCheck } from 'react-icons/hi';


interface applications {
    Company: string,
    JobPost: string,
    ProfileImg: string,
    ResumeFile: string,
    bio: string,
    createdAt: string,
    email: string,
    mobile: string,
    name: string,
    password: string,
    role: string,
    skills: string,
    updatedAt: string,
    __v: string,
    _id: string,

}

interface Applicants {
    applicant: applications;
    createdAt: string;
    job: string;
    status: string;
    updatedAt: string;
    __v: string,
    _id: string,
}

const ApplicantsJobs: React.FC = () => {

    const [jobsDefault, setJobsDefault] = useState<Applicants[]>([]);
    const [companyId, setCompanyId] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const ApplyJobsUser = async () => {
            const Token = localStorage.getItem("Token")
            try {
                const response = await axios.get(`http://localhost:8000/Application/Applicants/Jobs/${id}`, {
                    headers: {
                        authorization: `Bearer ${Token}`,
                    }

                })
                setJobsDefault(response.data?.applications);
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
        ApplyJobsUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showEditButton = (id: string) => {
        if (id == id) {
            setCompanyId(prevId => (prevId === id ? null : id));
        }
    };

    const handelstatus = async (status: string, ApplicationId: string) => {
        const formdata = new FormData()
        formdata.append("status", status)
        try {
            console.log(status);
            const response = await axios.post(`http://localhost:8000/Application/Updata/Status/${ApplicationId}`, formdata, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            });

            console.log(response.data);
            if (response.status == 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{response.data?.message}</div>)
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

    return (
        <>
            <div className='grid grid-cols-1'>
                <ToastContainer />
                <h1 className='px-24 font-serif text-[30px] md:mt-10'>Applicants({jobsDefault.length})</h1>
                <div className='grid grid-cols-6 md:ml-24 md:mt-5 cursor-pointer'>
                    <h1 className='text-[20px] text-gray-500 font-serif font-medium '>Full Name</h1>
                    <h1 className='text-[20px] text-gray-500 font-serif font-medium '>Email</h1>
                    <h1 className='text-[20px] text-gray-500 font-serif font-medium '>Contact</h1>
                    <h1 className='text-[20px] text-gray-500 font-serif font-medium '>Resume</h1>
                    <h1 className='text-[20px] text-gray-500 font-serif font-medium '>Date</h1>
                    <h1 className='text-[20px] text-gray-500 font-serif font-medium '>Action</h1>
                </div>

                <div className='grid grid-cols-1 md:mt-3 px-24'>
                    <hr className='h-[1.5px] bg-gray-300 ' />
                </div>

                {jobsDefault.map((val, index) => (
                    <div key={index} className='grid grid-cols-6 md:ml-24 md:mt-2 py-2 cursor-pointer'>
                        <h1 className='text-[16px] text-black font-serif font-medium '>{val?.applicant?.name}</h1>
                        <h1 className='text-[13px] text-black font-serif font-medium'>{val?.applicant?.email}</h1>

                        <h1 className='text-[16px] text-blue-700 font-serif font-medium hover:underline'>{val?.applicant?.mobile}</h1>

                        <h1 className='text-[16px] text-blue-700 font-serif font-medium hover:underline'>{val?.applicant?.ResumeFile}</h1>

                        <h1 className='font-serif text-lg font-medium'>
                            {val?.applicant?.updatedAt ? new Date(val?.applicant?.updatedAt).toLocaleDateString() : 'N/A'}
                        </h1>

                        <h1 className=' md:ml-5 text-lg cursor-pointer' onClick={() => showEditButton(val?._id)}>
                            <BsThreeDots className='text-balck hover:text-black transition-all' />
                            {companyId === val._id && (
                                <div className="absolute shadow shadow-gray-300 rounded-lg bg-white z-50 mt-3 -ml-10 p-1 ">
                                    <span className="flex items-center gap-2 text-black py-1.5 px-3 rounded-lg transition-all font-serif cursor-pointer hover:bg-green-600 hover:text-black " onClick={() => { handelstatus("accepted", val._id) }}>
                                        <HiCheck className="text-xl" /> Accepted
                                    </span>

                                    <span className="my-1 flex items-center gap-2 text-black py-1.5 px-3 rounded-lg transition-all font-serif cursor-pointer hover:bg-red-600 hover:text-black" onClick={() => { handelstatus("rejected", val._id) }}>
                                        <RxCross1 className="text-xl font-bold" />Rejected
                                    </span>
                                </div>
                            )}
                        </h1>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ApplicantsJobs;
