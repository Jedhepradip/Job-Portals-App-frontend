import axios from 'axios';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
const PostJobsAdmin: React.FC = () => {

    const [CompanyName, setCompanyname] = useState(String);
    const Navigate = useNavigate();

    interface InputPostJobs {
        Title: string,
        Description: string,
        Requirements: string,
        Salary: string,
        Location: string,
        JobType: string,
        ExperienceLevel: string
        NoOfPosition: string
    }

    const { register, handleSubmit, formState: { errors } } = useForm<InputPostJobs>();

    const onsubmit: SubmitHandler<InputPostJobs> = async (data) => {
        const formData = new FormData();
        formData.append("title", data.Title);
        formData.append("description", data.Description);
        formData.append("requirements", data.Requirements);
        formData.append("salary", data.Salary);
        formData.append("location", data.Location);
        formData.append("jobtype", data.JobType);
        formData.append("position", data.NoOfPosition);
        formData.append("experienceLevel", data.ExperienceLevel);
        formData.append("company", CompanyName);
        console.log(data);
        try {
            const response = await axios.post("http://localhost:8000/Admin/PostJobs", formData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            });
            const responsedata = await response.data;
            if (!response.data.ok) {
                console.log(response.status);
            }
            if (response.data.ok) {
                console.log(responsedata);
                Navigate("/AdminJons")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='grid place-items-center'>
                <div className='grid grid-cols-1 shadow shadow-gray-300 rounded-lg'>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <table className='w-full mt-1'>
                            <div className='space-y-2 py-6 px-4'>
                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Title</label>
                                        <input {...register("Title", {
                                            required: { value: true, message: "Title is required" }
                                        })}
                                            type="text"
                                            name='Title'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.Title && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Title.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Description</label>
                                        <input {...register("Description", {
                                            required: { value: true, message: "Description is required" }
                                        })}
                                            type="text"
                                            name='Description'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.Description && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Description.message}
                                            </div>
                                        )}
                                    </td>
                                </tr>

                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Requirements</label>
                                        <input {...register("Requirements", {
                                            required: { value: true, message: "Requirements is required" }
                                        })}
                                            type="text"
                                            name='Requirements'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.Requirements && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Requirements.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Salary <span className='text-[12px] text-gray-400'>(in LPA)</span></label>
                                        <input  {...register("Salary", {
                                            required: { value: true, message: "Salary is required" }
                                        })}
                                            type="number"
                                            name='Salary'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.Salary && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Salary.message}
                                            </div>
                                        )}
                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Location</label>
                                        <input {...register("Location", {
                                            required: { value: true, message: "Location is required" }
                                        })}
                                            type="text"
                                            name='Location'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.Location && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.Location.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Job Type</label>
                                        <input {...register("JobType", {
                                            required: { value: true, message: "Jobs Type is required" }
                                        })}
                                            type="text"
                                            name='JobType'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.JobType && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.JobType.message}
                                            </div>
                                        )}
                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Experience Level <span className='text-[12px] text-gray-400'>(in Years)</span></label>
                                        <input {...register("ExperienceLevel", {
                                            required: { value: true, message: "Experience Level is required" }
                                        })}
                                            type="number"
                                            name='ExperienceLevel'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.ExperienceLevel && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.ExperienceLevel.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>No Of Position</label>
                                        <input {...register("NoOfPosition", {
                                            required: { value: true, message: "No Of Position is required" }
                                        })}
                                            type="number"
                                            name='NoOfPosition'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                        {errors.NoOfPosition && (
                                            <div className="text-red-500 text-lg font-serif mt-0">
                                                {errors.NoOfPosition.message}
                                            </div>
                                        )}
                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        {/* <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Select a Company</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        /> */}
                                        <select className='block text-lg font-medium py-2 px-4 font-serif text-gray-700 border border-gray-300 rounded-lg' onChange={(e) => setCompanyname(e.target.value)}>
                                            <option>Select a Company</option>
                                            <option className='w-full px-4 py-1.5 border hover:bg-gray-400  rounded-md focus:ring-black  font-serif'>Google</option>
                                            <option className='w-full px-4 py-1.5 border hover:bg-gray-400  rounded-md focus:ring-black  font-serif'>Microsoft</option>
                                        </select>
                                    </td>
                                </tr>
                                <div className='w-full flex justify-center items-center'>
                                    <button className='bg-black text-white py-1 w-full mt-2 rounded-lg font-serif text-[20px]'>Post New Jobs</button>
                                </div>
                            </div>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostJobsAdmin
