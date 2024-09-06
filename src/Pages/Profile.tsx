import React, { useState } from 'react'
import png from "../assets/profile img.jpg"
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiContactsBook2Fill } from 'react-icons/ri'
import { LiaTimesSolid } from 'react-icons/lia'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'

{/* <BsThreeDots /> */ }
{/* <IoArrowBack /> */ }
{/* <IoEye /> */ }

const Profile: React.FC = () => {

    const [isEditFormVisible, setEditFormVisible] = useState(false)
    const [isProfileImg, setProfileimg] = useState(String)
    const [file, setfile] = useState(String)

    interface InputFrom {
        profile: string,
        name: string,
        email: string,
        mobile: string,
        password: string,
        bio: string,
        skill: string,
    }

    const { register, handleSubmit } = useForm<InputFrom>()


    const onSubmit: SubmitHandler<InputFrom> = async (data) => {
        const formData = new FormData();
        formData.append("file", file)
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("bio", data.bio);
        formData.append("skill", data.skill);

        console.log(formData);

        try {
            const response = await axios.put("http://localhost:8000", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responsedata = await response.data;
            console.log(responsedata);
        } catch (error) {
            console.log(error);
        }
    }

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


    const EditPageShowhidden = (): void => {
        setEditFormVisible(!isEditFormVisible)
    }

    const profileimg = (img: string): void => {
        if (img) {
            setProfileimg(img)
        } else {
            setProfileimg(" ")
        }
    }

    return (
        <>
            {
                isEditFormVisible && (
                    <>
                        <div className='grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/50'>
                            <div className='px-4 py-6 shadow-lg shadow-gray-300 rounded-lg bg-white max-w-sm mx-auto'>
                                <LiaTimesSolid className='float-right text-[25px] cursor-pointer' onClick={() => EditPageShowhidden()} />
                                <h1 className='text-center font-medium font-serif text-3xl mb-5 text-gray-800'>Update Profile</h1>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <table className="w-full">
                                        <div className='space-y-4'>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Name</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register("name")}
                                                        type="text"
                                                        name='name'
                                                        placeholder='Pradip Jedhe'
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                                    />
                                                </td>
                                            </tr>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Email</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register("email")}
                                                        type="email"
                                                        name='email'
                                                        placeholder='PradipJedhe@gmail.com'
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                                    />
                                                </td>
                                            </tr>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Number</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input
                                                        type="number"
                                                        name='mobile'
                                                        placeholder='8459844605'
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none'
                                                    />
                                                </td>
                                            </tr>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Bio</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register("bio")}
                                                        type="text"
                                                        name='bio'
                                                        placeholder='Tell us about yourself'
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                                    />
                                                </td>
                                            </tr>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Skill</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register('skill')}
                                                        type="text"
                                                        name='skill'
                                                        placeholder='Your skills'
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                                    />
                                                </td>
                                            </tr>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Resume</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input
                                                        type="file"
                                                        name='profile'
                                                        className='w-full px-4 py-1 border border-gray-300 rounded-md focus:ring-black focus:border-transparent outline-none font-serif'
                                                        onChange={(e) => setfile(e.target.value)} />
                                                </td>
                                            </tr>
                                        </div>
                                    </table>
                                    <button type="submit" className="mt-6 text-white w-[60%] flex justify-center items-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-lg px-5 py-[6px] dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mx-auto">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>

                    </>
                )
            }

            <div className='grid grid-cols-1 place-items-center absolute'>
                <div className='md:h-44 md:w-44 md:mt-40 rounded-full md:ml-20 h-28 w-28 ml-80 mt-28'>
                    <img src={isProfileImg} alt="" className='rounded-full' />
                </div>
            </div>

            <div className="grid place-items-center relative">
                <div className="p-10 shadow shadow-gray-200 rounded-lg ">
                    <div className='flex'>
                        <img src={png} alt="" className='h-20 w-20 mt-3 rounded-full bg-black' onMouseOver={() => profileimg(png)} onMouseOut={() => profileimg("")} />
                        <div className='px-3'>
                            <div className='h-7 w-10 md:ml-[450px] ml-[270px] shadow shadow-gray-200 bg-white rounded-md flex justify-center items-center' onClick={() => EditPageShowhidden()}>
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
                    <div className='flex justify-between px-5 text-[18px] shadow shadow-gray-200 py-2 rounded-t-lg font-serif'>
                        <h1 className="font-semibold">Date</h1>
                        <h1 className="font-semibold">Role</h1>
                        <h1 className="font-semibold">Company</h1>
                        <h1 className="font-semibold">Status</h1>
                    </div>
                    {jobData.map((job, index) => (
                        <div key={index} className='shadow-sm shadow-gray-200 bg-white flex justify-between items-center py-2 px-5 mt-1 last:rounded-b-lg md:gap-[90px] gap-10 font-serif'>
                            <h1>{job.date.toDateString()}</h1>
                            <h1>{job.role}</h1>
                            <h1>{job.company}</h1>
                            <h1 className='bg-gray-100 rounded-full px-2 text-black font-serif'>{job.status}</h1>
                        </div>
                    ))}
                </div>
                <h3 className='mt-2 text-gray-300'>A list of your recent applied jobs</h3>
            </div>


            {/* Edit From show hidden */}




        </>
    )
}

export default Profile
