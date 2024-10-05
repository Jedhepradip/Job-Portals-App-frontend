/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
// import png from "../assets/profile img.jpg"
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiContactsBook2Fill } from 'react-icons/ri'
import { LiaTimesSolid } from 'react-icons/lia'
import { useForm, SubmitHandler } from "react-hook-form"
import { RootState, AppDispatch } from '../App/store/store'
import { useSelector, useDispatch } from 'react-redux'
import { FetchingUserData } from '../App/Features/UserSlice'
import { FeachingapplicationData } from '../App/Features/ApplicationSlice'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

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

interface applicants {
    applicant: string,
    createdAt: string,
    job: JobPostData,
    status: string,
    updatedAt: string,
    __v: string,
    _id: string,
}

interface InputFrom {
    ResumeFile: string,
    ProfileImg: string,
    name: string,
    email: string,
    mobile: string,
    password: string,
    bio: string,
    skills: string,
}

const Profile: React.FC = () => {
    const [isEditFormVisible, setEditFormVisible] = useState(false)
    const [Resume, SetFileResume] = useState<File | null>(null);
    const [Profile, SetFileProfile] = useState<File | null>(null);
    const [UserData, setUserData] = useState<UserInterfase1 | null>(null);
    const [appyjobs, setapplyjobs] = useState<applicants[]>([]);
    const [loadingOTP, setLoadingOTP] = useState(false); // For Send OTP button
    const Navigate = useNavigate();
    const Userinfo: any = useSelector((state: RootState) => state.User.User)
    const applicationjobs: any = useSelector((state: RootState) => state.Applicants.applicant)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchingUserData())
        dispatch(FeachingapplicationData())
    }, [dispatch, isEditFormVisible])

    useEffect(() => {
        if (Userinfo) {
            setUserData(Userinfo)
        }
        if (applicationjobs) {
            setapplyjobs(applicationjobs)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Userinfo])

    const { register, handleSubmit } = useForm<InputFrom>()

    const onSubmit: SubmitHandler<InputFrom> = async (data) => {
        setLoadingOTP(true)
        const skillsSplit: any = data.skills.split(" ")
        const formData = new FormData();
        formData.append("ResumeFile", Resume!)
        formData.append("ProfileImg", Profile!)
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("bio", data.bio);
        formData.append("skills", skillsSplit);
        try {
            const response = await axios.put("http://localhost:8000/User/Update/Profile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Baera ${localStorage.getItem("Token")}`
                }
            });
            const UpdateUser = await response.data;
            if (response.status === 200) {
                toast.success(<div className="font-serif text-[15px] text-black">{UpdateUser.message}</div>);
                setTimeout(() => {
                    Navigate('/Profile');
                    setLoadingOTP(false)
                    setEditFormVisible(!isEditFormVisible)
                }, 2000);
            }
        } catch (error: any) {
            setTimeout(() => {
                setLoadingOTP(false)
            }, 2000);
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
    };
    const EditPageShowhidden = (): void => {
        setEditFormVisible(!isEditFormVisible)
    }


    return (
        <>
            {
                isEditFormVisible && (
                    <>
                        <div className='grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 '>
                            <div className='px-4 py-6 shadow-lg shadow-gray-300 rounded-lg bg-white max-w-sm mx-auto'>
                                <ToastContainer />
                                <LiaTimesSolid className='float-right text-[25px] cursor-pointer' onClick={() => EditPageShowhidden()} />
                                <h1 className='text-center font-medium font-serif text-3xl mb-4 text-gray-800'>Update Profile</h1>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <table className="w-full">
                                        <div className='space-y-3'>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Name</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register("name")}
                                                        type="text"
                                                        name='name'
                                                        defaultValue={UserData?.name}
                                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                                    />
                                                </td>
                                            </tr>

                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Profile</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register('ProfileImg')}
                                                        type="file"
                                                        name='ProfileImg'
                                                        className='w-full px-4 py-1 border border-gray-300 rounded-md focus:ring-black focus:border-transparent outline-none font-serif'
                                                        onChange={(e) => SetFileProfile(e.target.files ? e.target.files[0] : null)} />
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
                                                        defaultValue={UserData?.email}
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                                    />
                                                </td>
                                            </tr>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Number</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register("mobile")}
                                                        type="number"
                                                        name='mobile'
                                                        defaultValue={UserData?.mobile}
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
                                                        defaultValue={UserData?.bio}
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                                    />
                                                </td>
                                            </tr>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Skill</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register('skills')}
                                                        type="text"
                                                        name='skills'
                                                        defaultValue={UserData?.skills}
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                                    />
                                                </td>
                                            </tr>
                                            <tr className='flex items-center space-x-4'>
                                                <td className="w-[19%]">
                                                    <label className='block text-lg font-medium font-serif text-gray-700 float-right'>Resume</label>
                                                </td>
                                                <td className="w-[73%]">
                                                    <input {...register('ResumeFile')}
                                                        type="file"
                                                        name='ResumeFile'
                                                        className='w-full px-4 py-1 border border-gray-300 rounded-md focus:ring-black focus:border-transparent outline-none font-serif'
                                                        onChange={(e) => SetFileResume(e.target.files ? e.target.files[0] : null)} />
                                                </td>
                                            </tr>
                                        </div>
                                    </table>

                                    <div className="w-full flex justify-center items-center pb-2">
                                        <button
                                            type='submit'
                                            className={`mt-3 text-white w-[100%] flex justify-center items-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-serif rounded-md px-5 py-1.5 text-[23px] dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mx-auto font-medium ${loadingOTP ? 'cursor-not-allowed' : ''}`}
                                            disabled={loadingOTP}
                                        >
                                            {loadingOTP && (
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 text-white rounded-full"
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
                                            )}
                                            <span>{loadingOTP ? 'Loading...' : 'Update'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }

            <div className="grid md:place-items-center relative z-10">
                <div className="p-10 shadow shadow-gray-200 rounded-lg ">
                    <div className='flex'>
                        <img
                            src={UserData?.ProfileImg}
                            alt=""
                            className='h-20 w-20 mt-3 rounded-full object-cover bg-black'
                        />
                        <div className='px-3'>
                            <div className='h-7 w-10 md:ml-[450px] ml-[230px] shadow shadow-gray-200 bg-white rounded-md flex justify-center items-center' onClick={() => EditPageShowhidden()}>
                                <FiEdit2 className='text-[20px]' />
                            </div>
                            <h1 className='font-bold'>{UserData?.name}</h1>
                            <p className='font-serif'>{UserData?.bio}</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex px-2 mt-2'>
                            <MdOutlineMailOutline className='mt-1 text-[20px]' />
                            <h1 className='ml-2 font-medium'>{UserData?.email}</h1>
                        </div>
                        <div className='flex px-2 mt-2'>
                            <RiContactsBook2Fill className='mt-1 text-[20px]' />
                            <h1 className='ml-2 font-medium'>{UserData?.mobile}</h1>
                        </div>
                        <h2 className='font-bold text-[20px] px-2 mt-3'>skills</h2>
                        <div className='gap-4 mt-4 grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
                            {UserData?.skills?.length && <>
                                {UserData?.skills?.map((val: any, index: any) => (
                                    <h3
                                        key={index}
                                        // bg-purple-600 bg-gradient-to-r from-purple-600 to-indigo-600
                                        className='bg-black bg-gradient-to-r from-gray-800 to-slate-400 px-1 lg:px-1 sm:px-5 py-[2px] text-white text-[14px] md:px-2.5 rounded-full text-center shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'
                                    >
                                        {val}
                                    </h3>
                                ))}
                            </>}
                        </div>
                        <h1 className="font-bold mt-2 text-[19px]">Resume</h1>
                        <a
                            href={UserData?.ResumeFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded mt-2 inline-block"
                        >
                            View Resume
                        </a>

                        <h2 className="text-blue-600 mt-1 hover:underline">
                            {UserData?.ResumeFile ? 'Resume Available' : 'No Resume Uploaded'}
                        </h2>

                    </div>
                </div>
            </div>

            {appyjobs.length ? <>
                <h1 className='font-bold text-2xl w-full md:px-[298px] px-2 mt-10'>Applied Jobs</h1>
                <div className='md:mt-2 mt-10 text-[20px] font-serif grid md:grid-cols-4 grid-cols-4 px-4 md:px-24 place-items-center ml-4 md:ml-32 py-2 shadow shadow-gray-300'>
                    <h1 className="font-medium">Date</h1>
                    <h1 className="font-medium">Role</h1>
                    <h1 className="font-medium">Company</h1>
                    <h1 className="font-medium">Status</h1>
                </div>

                {/* {appyjobs.map((val, index) => (
                    <div className='grid md:grid-cols-4 grid-cols-1 px-[180px] place-items-center] ml-32 py-1 shadow shadow-gray-300'>
                        <div className='font-serif mb-1 mt-1  py-1.5'>
                            <h1 key={index} className='font-serif text-lg font-medium '>
                                {val?.createdAt ? new Date(val.createdAt).toLocaleDateString() : 'N/A'}
                            </h1>
                        </div>
                        <div className='font-serif mb-1 mt-1  py-1.5'>
                            <h1 className=''>{val?.job?.title}</h1>
                        </div>
                        <div className='font-serif mb-1 mt-1  py-1.5'>
                            <h1>{val?.job?.companyName}</h1>
                        </div>

                        <div
                            className={`font-serif mb-1 mt-1 w-[45%] justify-center flex items-center rounded-lg py-1 ${val.status === 'pending'
                                ? 'bg-gray-300'
                                : val.status === 'accepted'
                                    ? 'bg-green-600'
                                    : 'bg-red-500'
                                }`}
                        >
                            <h1>{val.status}</h1>
                        </div>
                    </div>
                ))} */}

                {appyjobs.map((val, index) => (
                    <div className='grid md:grid-cols-4 grid-cols-4 px-4 md:px-24 place-items-center ml-4 md:ml-32 py-2 shadow shadow-gray-300'>
                        <div className='font-serif mb-1 mt-1 py-1 text-center'>
                            <h1 key={index} className='font-serif text-lg font-medium'>
                                {val?.createdAt ? new Date(val.createdAt).toLocaleDateString() : 'N/A'}
                            </h1>
                        </div>
                        <div className='font-serif mb-1 mt-1 py-1 text-center'>
                            <h1>{val?.job?.title}</h1>
                        </div>
                        <div className='font-serif mb-1 mt-1 py-1 text-center'>
                            <h1>{val?.job?.companyName}</h1>
                        </div>
                        <div
                            className={`font-serif mb-1 mt-1 w-[70%] md:w-[45%] flex justify-center items-center rounded-lg py-1 text-center ${val.status === 'pending'
                                ? 'bg-gray-300'
                                : val.status === 'accepted'
                                    ? 'bg-green-600'
                                    : 'bg-red-500'
                                }`}
                        >
                            <h1>{val.status}</h1>
                        </div>
                    </div>
                ))}

            </>
                :
                <>
                    <div className='md:px-72'>
                        <NavLink to={"/"} >
                            <h1 className='text-blue-800 hover:underline text-2xl px-2 mt-10 font-serif'>Appy For The Jobs</h1>
                            <hr className="h-[2px] mt-7 px-24 bg-gray-400" />
                        </NavLink>
                    </div>
                </>
            }
        </>
    )
}

export default Profile
