/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../App/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FetchingCompanyData } from '../App/Features/CompanySlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface InputForm {
    CompanyName: string;
    description: string;
    website: string;
    location: string;
    CompanyLogo: string;
}

interface CompanyData {
    _id: string;
    CompanyName: string;
    UserId: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    location: string;
    website: string;
    __v: number;
}

const SetUpCompanyPage: React.FC = () => {

    const [file, setFile] = useState<File | null>(null);
    const [companies, setCompanies] = useState<CompanyData[]>([]);
    const { id } = useParams<{ id: string }>();

    const Company = useSelector((state: RootState) => state.Company.Company);
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();    

    useEffect(() => {
        dispatch(FetchingCompanyData());
    }, [dispatch]);

    useEffect(() => {
        if (Company.length) {
            setCompanies(Company);
        }
    }, [Company, companies]);

    const FilterCompany: any = companies.filter((e) => e._id === id);

    const { register, handleSubmit, formState: { errors } } = useForm<InputForm>();

    const onSubmit: SubmitHandler<InputForm> = async (data) => {
        if (!file) {
            toast.error('Please select a logo file');
            return;
        }

        const formData = new FormData();
        formData.append('CompanyLogo', file); // Appending the file
        formData.append('CompanyName', data.CompanyName);
        formData.append('description', data.description);
        formData.append('website', data.website);
        formData.append('location', data.location);

        try {
            const response = await axios.put(`http://localhost:8000/Company/UpdateCompany/${id}`, formData, {
                headers: {
                    // Don't set Content-Type; axios sets it automatically for FormData
                    authorization: `Bearer ${localStorage.getItem('Token')}`,
                },
            });

            if (response.status === 200) {
                toast.success(<div className="font-serif text-[15px] text-black">Company updated successfully</div>);
                setTimeout(() => {
                    navigate('/Company');
                }, 1300);
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                toast.error(<div className="font-serif text-[15px] text-black">{errorMessage}</div>);
            } else {
                toast.error(<div className="font-serif text-[15px] text-black">Unexpected error occurred</div>);
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="grid grid-cols-1 place-items-center">
                <div className="px-5 py-5 shadow-lg shadow-gray-300 rounded-lg">
                    <div className="flex">
                        <NavLink to="/CreateCompanyAdmin">
                            <h1 className="flex text-[18px] mt-3 font-serif text-gray-500">
                                <IoArrowBack className="text-[25px]" />
                                <span className="ml-1.5 text-gray-500">Back</span>
                            </h1>
                        </NavLink>
                        <h1 className="text-[30px] font-bold px-10 font-serif">
                            <span className="font-serif text-[35px]">C</span>ompany SetUp
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="w-full mt-7">
                            <div className="space-y-3">
                                <tr className="flex items-center space-x-4">
                                    <td className="w-[50%]">
                                        <label className="block text-lg font-medium font-serif text-gray-700 px-1">Company Name</label>
                                        <input {...register('CompanyName')}
                                            type="text"
                                            name="CompanyName"
                                            value={FilterCompany[0]?.CompanyName} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black font-serif" />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className="block text-lg font-medium font-serif text-gray-700 px-1">Description</label>
                                        <input {...register('description', { required: { value: true, message: 'Description is required' } })}
                                            type="text"
                                            name="description"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black font-serif" />
                                        {errors.description && (
                                            <div className="text-red-500 text-lg font-serif mt-0">{errors.description.message}</div>
                                        )}
                                    </td>
                                </tr>
                                <tr className="flex items-center space-x-4">
                                    <td className="w-[50%]">
                                        <label className="block text-lg font-medium font-serif text-gray-700 px-1">Website</label>
                                        <input {...register('website', { required: { value: true, message: 'Website is required' } })}
                                            type="text"
                                            name="website"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black font-serif" />
                                        {errors.website && (
                                            <div className="text-red-500 text-lg font-serif mt-0">{errors.website.message}</div>
                                        )}
                                    </td>
                                    <td className="w-[50%]">
                                        <label className="block text-lg font-medium font-serif text-gray-700 px-1">Location</label>
                                        <input {...register('location', { required: { value: true, message: 'Location is required' } })}
                                            type="text"
                                            name="location"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black font-serif" />
                                        {errors.location && (
                                            <div className="text-red-500 text-lg font-serif mt-0">{errors.location.message}</div>
                                        )}
                                    </td>
                                </tr>

                                <tr className="flex items-center space-x-4">
                                    <td className="w-[50%]">
                                        <label className="block text-lg font-medium font-serif text-gray-700">Logo</label>
                                        <input {...register('CompanyLogo', { required: { value: true, message: 'Logo is required' } })}
                                            type="file"
                                            name="CompanyLogo"
                                            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:ring-black focus:border-transparent outline-none font-serif mb-1" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                                        {errors.CompanyLogo && (
                                            <div className="text-red-500 text-lg font-serif mt-0">{errors.CompanyLogo.message}</div>
                                        )}
                                    </td>
                                </tr>
                            </div>
                        </table>
                        <button type="submit" className="px-5 py-1 rounded-lg text-[22px] font-serif text-white bg-black w-full mt-3">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SetUpCompanyPage;
