import React from 'react'
import png from "../assets/profile img.jpg"
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiContactsBook2Fill } from 'react-icons/ri'
const Profile: React.FC = () => {

    // interface JobDataInfo {
    //     date: Date;
    //     role: string;
    //     company: string;
    //     status: string;
    // }

    // const jobData: JobDataInfo[] = [
    //     { date: new Date('2024-09-01'), role: 'Frontend Developer', company: 'TechCorp', status: 'Applied' },
    //     { date: new Date('2024-09-02'), role: 'Backend Developer', company: 'WebSolutions', status: 'Interview' },
    // ];



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
                            <h1 className='font-bold'>Nilesh </h1>
                            <p className='font-serif'>Lorem ipsum dolor sit amet consectetur </p>
                        </div>
                    </div>
                    <div>
                        <div className='flex px-2 mt-2'>
                            <MdOutlineMailOutline className='mt-1 text-[20px]' />
                            <h1 className='ml-2 font-medium'>Pradip@gmail.com</h1>
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

            <h1 className='font-bold text-[20px] ml-[300px] mt-10'>Applied Jobs</h1>

            <div className="grid place-items-center">
                <div className="shadow shadow-gray-200 rounded-lg bg-red-900 w-full ">
                    <div className='shadow shadow-gray-200 rounded-lg bg-red-500 flex gap-6 py-5 px-5 w-full'>
                        <h1 className='flex-1'>Date</h1>
                        <h1 className='flex-1'>Job Role</h1>
                        <h1 className='flex-1'>Company</h1>
                        <h1 className='flex-1'>Status</h1>
                    </div>
                </div>
            </div>
            {/* <div className='grid place-items-center mt-10 grid-cols-1'>
             
                <div className='shadow shadow-gray-200 rounded-lg bg-red-500 flex gap-10 py-5 px-5 w-full'>
                    <h1 className='flex-1'>Date</h1>
                    <h1 className='flex-1'>Job Role</h1>
                    <h1 className='flex-1'>Company</h1>
                    <h1 className='flex-1'>Status</h1>
                </div>

             
                {jobData.map((job, index) => (
                    <div key={index} className='shadow shadow-gray-200 rounded-lg bg-white flex gap-10 py-5 px-5 w-full'>
                        <h1 className='flex-1'>{job.date.toLocaleDateString()}</h1>
                        <h1 className='flex-1'>{job.role}</h1>
                        <h1 className='flex-1'>{job.company}</h1>
                        <h1 className='flex-1'>{job.status}</h1>
                    </div>
                ))}
            </div> */}

        </>
    )
}

export default Profile
