import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { HiCheck } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';

interface Applications {
  Company: string;
  JobPost: string;
  ProfileImg: string;
  ResumeFile: string;
  bio: string;
  createdAt: string;
  email: string;
  mobile: string;
  name: string;
  password: string;
  role: string;
  skills: string;
  updatedAt: string;
  __v: string;
  _id: string;
}

interface Applicants {
  applicant: Applications;
  createdAt: string;
  job: string;
  status: string;
  updatedAt: string;
  __v: string;
  _id: string;
}

const ApplicantsJobs: React.FC = () => {
  const [jobsDefault, setJobsDefault] = useState<Applicants[]>([]);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const ApplyJobsUser = async () => {
      const Token = localStorage.getItem("Token");
      try {
        const response = await axios.get(`http://localhost:8000/Application/Applicants/Jobs/${id}`, {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        });
        setJobsDefault(response.data?.applications);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
        } else {
          console.error("Error: Network issue or server not responding", error);
        }
      }
    };
    ApplyJobsUser();
  }, [id]);

  const showEditButton = (id: string) => {
    setCompanyId(prevId => (prevId === id ? null : id));
  };

  const handelstatus = async (status: string, ApplicationId: string) => {
    const formdata = new FormData();
    formdata.append("status", status);
    try {
      const response = await axios.post(`http://localhost:8000/Application/Updata/Status/${ApplicationId}`, formdata, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      if (response.status === 200) {
        toast.success(<div className='font-serif text-[15px] text-black'>{response.data?.message}</div>);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
      } else {
        console.error("Error: Network issue or server not responding", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='container mx-auto p-4  rounded-lg px-20'>
        <h1 className='text-2xl md:text-3xl font-serif font-semibold text-center md:text-left mb-8 text-gray-800 mt-5'>
          Applicants ({jobsDefault.length})
        </h1>
        <div className='hidden md:grid grid-cols-6 text-center md:text-left cursor-pointer'>
          <h1 className='text-sm md:text-lg text-gray-700 font-medium'>Full Name</h1>
          <h1 className='text-sm md:text-lg text-gray-700 font-medium'>Email</h1>
          <h1 className='text-sm md:text-lg text-gray-700 font-medium'>Contact</h1>
          <h1 className='text-sm md:text-lg text-gray-700 font-medium'>Resume</h1>
          <h1 className='text-sm md:text-lg text-gray-700 font-medium'>Date</h1>
          <h1 className='text-sm md:text-lg text-gray-700 font-medium'>Action</h1>
        </div>

        {/* <div className='border-t-2 border-gray-300 mt-3 mb-5'></div> */}
        <hr className='w-full mt-5 h-[1px] bg-black text-black' />

        {jobsDefault.map((val, index) => (
          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-6 gap-y-4 md:gap-y-0 items-center text-center md:text-left p-4 bg-white rounded-lg mb-4  duration-200 ease-in-out cursor-pointer'
          >
            <h1 className='text-base md:text-lg text-gray-800 font-serif font-medium'>
              {val?.applicant?.name}
            </h1>
            <h1 className='text-sm md:text-base mr-10 text-gray-700 font-serif truncate'>
              {val?.applicant?.email}
            </h1>
            <h1 className='text-sm md:text-base text-blue-600 font-serif cursor-pointer hover:underline'>
              {val?.applicant?.mobile}
            </h1>
            <h1 className='text-sm md:text-base text-blue-600 font-serif cursor-pointer hover:underline'>
              {val?.applicant?.ResumeFile}
            </h1>
            <h1 className='text-sm md:text-base text-gray-700 font-serif'>
              {val?.applicant?.updatedAt ? new Date(val?.applicant?.updatedAt).toLocaleDateString() : 'N/A'}
            </h1>
            <div className='relative'>
              <BsThreeDots
                className='mx-auto md:mx-0 cursor-pointer text-2xl text-gray-600 hover:text-gray-800 transition-all'
                onClick={() => showEditButton(val._id)}
              />
              {companyId === val._id && (
                <div className='absolute top-7 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 bg-white border border-gray-200 shadow-lg rounded-lg z-50 py-2'>
                  <span
                    className="flex items-center gap-2 text-gray-800 py-2 px-4 hover:bg-green-700 hover:text-white rounded-lg transition-colors cursor-pointer font-medium font-serif"
                    onClick={() => handelstatus("accepted", val._id)}
                  >
                    <HiCheck className="font-bold font-serif" /> Accepted
                  </span>
                  <span
                    className="flex items-center gap-2 text-gray-800 py-2 px-4 hover:bg-red-700 hover:text-white rounded-lg transition-colors cursor-pointer font-medium font-serif"
                    onClick={() => handelstatus("rejected", val._id)}
                  >
                    <RxCross2 className="text-lg font-bold" /> Rejected
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplicantsJobs;
