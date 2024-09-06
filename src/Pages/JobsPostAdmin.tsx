import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const JobsPostAdmin: React.FC = () => {

    const [isEditFormVisible, setEditFormVisible] = useState(false)

    interface JobDataInfo {
        CompanyName: string;
        role: string;
        date: Date;
    }

    const jobData: JobDataInfo[] = [
        { date: new Date('2024-09-01'), CompanyName: 'google', role: 'Backend Devloper' },
        // { date: new Date('2024-09-02'), Logo: 'xyzimg', name: 'Google' },
    ];

    const showeditbutton = (data: string) => {
        if (data == "EditPage") {
            setEditFormVisible(!isEditFormVisible)
            console.log("oko");

        }
    }

    return (
        <>
            <div className='grid grid-cols-1' onClick={() => showeditbutton("")}>
                <div className="md:px-28 mt-7 mb-3 md:p-0 p-3 ">
                    <input
                        type="email"
                        name='email'
                        placeholder='Filter Company name & role'
                        className='px-4 py-2 border w-[23%] border-gray-300 rounded-md focus:ring-black  font-serif'
                    />
                    <NavLink to="/AdminNewJobsPost" > <button className='bg-black text-white py-1.5 px-4 md:px-6 md:py-1.5 text-[18px] float-right rounded-lg font-serif'>New Jobs</button></NavLink>
                </div>

                <div className="md:px-32 mt-7 mb-1 md:p-0 p-3 flex justify-between items-center grid grid-cols-4">
                    <h1 className='font-serif text-[20px] font-medium'>Company Name</h1>
                    <h1 className='font-serif text-[20px] font-medium'>Role</h1>
                    <h1 className='font-serif text-[20px] font-medium'>Date</h1>
                    <h1 className='font-serif text-[20px] font-medium'>Action</h1>

                    {jobData.map((val, index) => (
                        <div key={index} className='flex gap-[195px] mt-4'>
                            <h1 className='font-serif text-[20px] font-medium'>{val.CompanyName}</h1>
                            <h1 className='font-serif text-[20px] font-medium'>{val.role}</h1>
                            <h1 className='font-serif text-[20px] font-medium'>123</h1>
                            <h1 className='font-serif text-[20px] font-medium ml-20 cursor-pointer' onClick={() => showeditbutton("EditPage")}><BsThreeDots /> </h1>
                        </div>
                    ))}

                </div>
            </div>

            {isEditFormVisible &&
                <>
                    <NavLink to="/" >
                        <div className='px-80 w-full absolute'>
                            <span className='py-1 px-2.5 ml-20 gap-1 flex rounded-lg float-right text-black font-serif shadow shadow-gray-300 text-[20px] cursor-pointer'> <FiEdit2 className='text-[18px] mt-1' /> Edit</span>
                        </div></NavLink>
                </>}

        </>
    )
}

export default JobsPostAdmin
