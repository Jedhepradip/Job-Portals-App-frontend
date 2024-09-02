import React from 'react'
import png from "../assets/profile img.jpg"
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiContactsBook2Fill } from 'react-icons/ri'
const Profile: React.FC = () => {

    interface JobDataInfo {
        date: Date;
        role: string;
        company: string;
        status: string;
    }

    const jobData: JobDataInfo[] = [
        { date: new Date('2024-09-01'), role: 'Frontend Developer', company: 'TechCorp', status: 'Applied' },
        { date: new Date('2024-09-02'), role: 'Backend Developer', company: 'WebSolutions', status: 'Interview' },
    ];



    return (
        <>
            <div className="grid place-items-center">
                <div className="p-10 shadow shadow-gray-200 rounded-lg ">
                    <div className='flex'>
                        <img src={png} alt="" className='h-20 w-20 mt-3 rounded-full' />
                        <div className='px-3'>
                            <div className='h-7 w-10 md:ml-[450px] ml-[270px] shadow shadow-gray-200 bg-white rounded-md flex justify-center items-center'>
                                <FiEdit2 className='text-[20px]' />
                            </div>
                            <h1 className='font-bold'>Pradip Jedhe  </h1>
                            <p className='font-serif'>I Am A Full Stack Devloper</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex px-2 mt-2'>
                            <MdOutlineMailOutline className='mt-1 text-[20px]' />
                            <h1 className='ml-2 font-medium'>Pradipjedhe@gmail.com</h1>
                        </div>
                        <div className='flex px-2 mt-2'>
                            <RiContactsBook2Fill className='mt-1 text-[20px]' />
                            <h1 className='ml-2 font-medium'>91+ 8459844605</h1>
                        </div>
                        <h2 className='font-bold text-[20px] px-2 mt-3'>skills</h2>
                        <div className='flex gap-4 mt-2'>
                            <h3 className='bg-black text-white text-[14px] px-2 rounded-full'>Node.js</h3>
                            <h3 className='bg-black text-white text-[14px] px-2 rounded-full'>Express.js</h3>
                            <h3 className='bg-black text-white text-[14px] px-2 rounded-full'>Mongodb</h3>
                            <h3 className='bg-black text-white text-[14px] px-2 rounded-full'>React.js</h3>
                            <h3 className='bg-black text-white text-[14px] px-2 rounded-full'>Typescript</h3>
                        </div>
                        <h1 className='font-bold mt-2 text-[19px]'>Resume</h1>
                        <h2 className='text-blue-600 mt-1 hover:underline'>Pradip Jedhe Resime.pdf</h2>
                    </div>
                </div>
            </div>

            <h1 className='font-bold text-2xl w-full md:px-[298px] px-2 mt-10'>Applied Jobs</h1>
            <div className="grid place-items-center md:mt-5 mt-1">
                <div className="md:shadow shadow-gray-200 rounded-lg w-full md:w-auto md:px-0 md:py-0 px-1 py-2">
                    <div className='flex justify-between px-5 text-[18px] shadow shadow-gray-200 py-2 rounded-t-lg'>
                        <h1 className="font-semibold">Date</h1>
                        <h1 className="font-semibold">Role</h1>
                        <h1 className="font-semibold">Company</h1>
                        <h1 className="font-semibold">Status</h1>
                    </div>
                    {jobData.map((job, index) => (
                        <div key={index} className='shadow-sm shadow-gray-200 bg-white flex justify-between items-center py-2 px-5 mt-1 last:rounded-b-lg md:gap-[90px] gap-10'>
                            <h1>{job.date.toLocaleDateString()}</h1>
                            <h1>{job.role}</h1>
                            <h1>{job.company}</h1>
                            <h1 className='bg-gray-300 rounded-full px-2 text-black font-medium'>{job.status}</h1>
                        </div>
                    ))}
                </div>
                <h3 className='mt-2 text-gray-300'>A list of your recent applied jobs</h3>
            </div>

        </>
    )
}

export default Profile
