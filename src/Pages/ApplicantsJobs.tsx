import React, { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';

interface Applicants {
    name: string;
    email: string;
    contact: string;
    resume: string;
    date: string;
}

const ApplicantsJobs: React.FC = () => {

    const [jobsDefault, setJobsDefault] = useState<Applicants[]>([]);

    const userData: Applicants[] = [
        {
            name: "nilesh",
            email: "nilesh@gmail.com",
            contact: "1234567890",
            resume: "resume",
            date: "12/3/2020"
        },
        {
            name: "nilesh",
            email: "nilesh@gmail.com",
            contact: "1234567890",
            resume: "resume",
            date: "12/3/2020"
        },
        {
            name: "nilesh",
            email: "nilesh@gmail.com",
            contact: "1234567890",
            resume: "resume",
            date: "12/3/2020"
        },
        {
            name: "nilesh",
            email: "nilesh@gmail.com",
            contact: "1234567890",
            resume: "resume",
            date: "12/3/2020"
        },
        // Add more applicants here if needed
    ];

    useEffect(() => {
        setJobsDefault(userData);
    }, [jobsDefault]);

    return (
        <>
            <div className='grid grid-cols-1'>
                <h1 className='px-24 font-serif text-[30px] md:mt-10'>Applicants({jobsDefault.length})</h1>
                <div className='grid grid-cols-6 md:ml-24 md:mt-5'>
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
                    <div key={index} className='grid grid-cols-6 md:ml-24 md:mt-2 py-2'>
                        <h1 className='text-[16px] text-black font-serif font-medium '>{val.name}</h1>
                        <h1 className='text-[16px] text-black font-serif font-medium '>{val.email}</h1>
                        <h1 className='text-[16px] text-black font-serif font-medium '>{val.contact}</h1>
                        <h1 className='text-[16px] text-blue-700 font-serif font-medium hover:underline'>{val.resume}</h1>
                        <h1 className='text-[16px] text-black font-serif font-medium '>{val.date}</h1>
                        <h1 className='text-[16px] text-black font-serif font-medium '>
                            <BsThreeDots className='text-gray-500 hover:text-black transition-all' />
                        </h1>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ApplicantsJobs;
