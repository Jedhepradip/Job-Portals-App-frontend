/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import png from "../assets/profile img.jpg"
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiContactsBook2Fill } from 'react-icons/ri'
import { LiaTimesSolid } from 'react-icons/lia'
import { useForm, SubmitHandler } from "react-hook-form"
import { RootState, AppDispatch } from '../App/store/store'
import { useSelector, useDispatch } from 'react-redux'
import { FetchingUserData } from '../App/Features/UserSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface CompanyData {
    id: string;
    name: string;
    logo: string;
    // other fields...
}

interface JobPostData {
    id: string;
    title: string;
    description: string;
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
    job: [],
    status: string,
    updatedAt: string,
    __v: string,
    _id: string,
}

const Profile: React.FC = () => {

    const [isEditFormVisible, setEditFormVisible] = useState(false)
    const [UserData, setUserData] = useState<UserInterfase1 | null>(null);
    const [appyjobs, setapplyjobs] = useState<applicants | []>([]);
    const [isProfileImg, setProfileimg] = useState(String)
    const [file, setfile] = useState(String)
    const Navigate = useNavigate();
    const Userinfo: any = useSelector((state: RootState) => state.User.User)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchingUserData())
    }, [dispatch, Userinfo])

    useEffect(() => {
        if (Userinfo) {
            setUserData(Userinfo)
        }
    }, [Userinfo])

    interface InputFrom {
        profile: string,
        name: string,
        email: string,
        mobile: string,
        password: string,
        bio: string,
        skills: string,
    }

    const { register, handleSubmit } = useForm<InputFrom>()

    const onSubmit: SubmitHandler<InputFrom> = async (data) => {
        const skillsSplit: any = data.skills.split(" ")
        const formData = new FormData();
        formData.append("file", file)
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("bio", data.bio);
        formData.append("skills", skillsSplit);

        try {
            const response = await axios.put("http://localhost:8000/User/Update/Profile", formData, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Baera ${localStorage.getItem("Token")}`
                }
            });
            const UpdateUser = await response.data;
            if (response.status === 200) {
                toast.success(<div className="font-serif text-[15px] text-black">{UpdateUser.message}</div>);
                setTimeout(() => {
                    Navigate('/Profile');
                    setEditFormVisible(!isEditFormVisible)
                }, 1800);
            }
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
    };


    useEffect(() => {
        const getApplyJobsdata = async () => {
            try {
                const response = await axios.get("http://localhost:8000/Application/ApplyJob/Show/Student", {
                    headers: {
                        authorization: `Baera ${localStorage.getItem("Token")}`
                    }
                })
                const applyJobsData = await response.data;
                console.log(applyJobsData);
                setapplyjobs(applyJobsData)
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
        getApplyJobsdata();
    }, [])

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
                        <div className='grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 '>
                            <div className='px-4 py-6 shadow-lg shadow-gray-300 rounded-lg bg-white max-w-sm mx-auto'>
                                <ToastContainer />
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
                                                        defaultValue={UserData?.name}
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
                                                    <input
                                                        type="file"
                                                        name='profile'
                                                        className='w-full px-4 py-1 border border-gray-300 rounded-md focus:ring-black focus:border-transparent outline-none font-serif'
                                                        onChange={(e) => setfile(e.target.value)} />
                                                </td>
                                            </tr>
                                        </div>
                                    </table>
                                    <button type="submit" className="mt-6 text-white w-[100%] flex justify-center items-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-lg px-5 py-[6px] dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mx-auto">
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
                        <div className='gap-4 mt-2 grid grid-cols-7'>
                            {UserData?.skills?.map((val: any, index: any) => (
                                <h3 key={index} className='bg-black text-white text-[14px] px-1.5 rounded-full text-center'>{val}</h3>
                            ))}
                        </div>
                        <h1 className='font-bold mt-2 text-[19px]'>Resume</h1>
                        <h2 className='text-blue-600 mt-1 hover:underline'>Pradip Jedhe Resime.pdf {UserData?.ResumeFile}</h2>
                    </div>
                </div>
            </div>

            <h1 className='font-bold text-2xl w-full md:px-[298px] px-2 mt-10'>Applied Jobs</h1>
            {/* <div className="grid place-items-center md:mt-5 mt-1">
                <div className="md:shadow shadow-gray-200 rounded-lg w-full md:w-auto md:px-0 md:py-0 px-1 py-2">
                    <div className='flex justify-between px-5 text-[18px] shadow shadow-gray-200 py-2 rounded-t-lg font-serif'>
                        <h1 className="font-semibold">Date</h1>
                        <h1 className="font-semibold">Role</h1>
                        <h1 className="font-semibold">Company</h1>
                        <h1 className="font-semibold">Status</h1>
                    </div>
                    {appyjobs.map((val, index) => (
                        <div key={index} className='shadow-sm shadow-gray-200 bg-white flex justify-between items-center py-2 px-5 mt-1 last:rounded-b-lg md:gap-[90px] gap-10 font-serif'>
                            <h1 className='font-serif text-lg font-medium'>
                                {val?.createdAt ? new Date(val.createdAt).toLocaleDateString() : 'N/A'}
                            </h1>
                            <h1>{val?.job?.title}</h1>
                            <h1>{val?.job?.companyName}</h1>
                            <h1 className='bg-gray-100 rounded-full px-2 text-black font-serif'>{val.status}</h1>
                        </div>
                    ))}
                </div>
                <h3 className='mt-2 text-gray-300'>A list of your recent applied jobs</h3>
            </div> */}

            <div className='grid grid-cols-4 px-[180px] place-items-center] ml-32 mt-2 shadow shadow-gray-300 py-2 text-[21px] font-serif'>
                <h1 className="font-medium">Date</h1>
                <h1 className="font-medium">Role</h1>
                <h1 className="font-medium">Company</h1>
                <h1 className="font-medium">Status</h1>
            </div>

            
                {appyjobs.map((val, index) => (
                    <div className='grid grid-cols-4 px-[180px] place-items-center] ml-32 py-1 shadow shadow-gray-300'>
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
                        <div className='font-serif mb-1 mt-1  bg-gray-300 w-[45%] justify-center flex items-center rounded-lg py-1'>
                            <h1>{val.status}</h1>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default Profile