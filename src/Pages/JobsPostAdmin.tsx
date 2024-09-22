import React, { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../App/store/store';
import { AdminCreatedJobsdata } from '../App/Features/JobsSlice';
import { FaEye } from 'react-icons/fa';

interface Job {
    _id: string,
    description: string,
    requirements: [],
    salary: string,
    location: string,
    jobtype: string,
    position: string,
    experienceLevel: string,
    companyName: string,
    company: string,
    CreatedBy: string,
    title: string,
    applications: [],
    JobPostDate: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
}

const JobsPostAdmin: React.FC = () => {

    const [companyId, setCompanyId] = useState<string | null>(null);
    const [jobData, setJobData] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const AdminCreatedJobs: Job[] = useSelector((state: RootState) => state.Jobs.AdminCreated);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(AdminCreatedJobsdata());
    }, [dispatch]);

    useEffect(() => {
        if (AdminCreatedJobs.length) {
            setJobData(AdminCreatedJobs);
        }
    }, [AdminCreatedJobs]);

    console.log(jobData);

    const showEditButton = (id: string) => {
        if (id == id) {
            setCompanyId(prevId => (prevId === id ? null : id));
        }
    };

    useEffect(() => {
        const filteredJobs = AdminCreatedJobs.filter((job: Job) =>
            job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setJobData(filteredJobs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <>
            <div className='grid grid-cols-1 px-6 mt-7 mb-3'>
                <div className="md:px-28 mt-7 mb-3 md:p-0 p-3">
                    <input
                        type="text"
                        name='search'
                        placeholder='Filter by Company name & role'
                        className='px-4 py-2 border md:w-[27%] w-[60%] border-gray-300 rounded-md focus:ring-black font-serif'
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <NavLink to="/AdminNewJobsPost" >
                        <button className='bg-black text-white py-1.5 px-6 md:px-6 md:py-1.5 text-[18px] float-right rounded-lg font-serif'>
                            New Jobs
                        </button>
                    </NavLink>
                </div>

                {/* Table Headers */}
                <div className="grid grid-cols-4 text-center font-serif text-[23px] font-medium py-3 rounded-lg">
                    <h1>Company Name</h1>
                    <h1>Role</h1>
                    <h1>Date</h1>
                    <h1>Action</h1>
                </div>

                {/* Data Rows */}
                {jobData.map((val, index) => (
                    <div key={index} className='grid grid-cols-4 text-center items-center py-4 border-b border-gray-200 relative'>
                        <h1 className='font-serif text-lg font-medium'>{val.companyName}</h1>
                        <h1 className='font-serif text-lg font-medium'>{val.title}</h1>
                        <h1 className='font-serif text-lg font-medium'>
                            {val?.updatedAt ? new Date(val.updatedAt).toLocaleDateString() : 'N/A'}
                        </h1>
                        <h1 className='md:ml-32 l-10 relative text-lg cursor-pointer' onClick={() => showEditButton(val?._id)}>
                            <BsThreeDots className='text-gray-500 hover:text-black transition-all ml-10' />
                            {companyId === val._id && (
                                <div className="absolute shadow shadow-gray-300 rounded-lg  bg-white z-50 md:mt-3 md:-ml-10 mt-3">
                                    <NavLink to={`/EditJobsPost/${val._id}`}>
                                        <span className="flex items-center gap-2 text-black md:py-1.5 md:px-3 rounded-lg transition-all font-serif cursor-pointer hover:bg-black hover:text-white px-2 py-1">
                                            <FiEdit2 className="text-xl" /> Edit
                                        </span>
                                    </NavLink>

                                    <NavLink to={`/ApplicantsJobs/${val._id}`}>
                                        <span className="my-1 flex items-center gap-2 text-black md:py-1.5 md:px-3 px-2 py-1 rounded-lg transition-all font-serif cursor-pointer hover:bg-black hover:text-white">
                                            <FaEye className="text-xl" /> Applicants
                                        </span>
                                    </NavLink>
                                </div>
                            )}
                        </h1>
                    </div>
                ))}
            </div>
        </>
    );
};

export default JobsPostAdmin;

