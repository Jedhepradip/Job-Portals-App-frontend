import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Companyesshow: React.FC = () => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  interface JobDataInfo {
    Logo: string;
    name: string;
    date: Date;
  }

  const jobData: JobDataInfo[] = [
    { date: new Date('2024-09-01'), Logo: 'xyzimg', name: 'google' },
    // Add more company data as needed
  ];

  const showEditButton = (data: string) => {
    if (data === "EditPage") {
      setEditFormVisible(!isEditFormVisible);
    }
  };

  return (
    <>
      <div className='grid grid-cols-1 px-6 mt-7 mb-3'>
        {/* Search input and button */}
        <div className="md:px-28 mt-7 mb-3 md:p-0 p-3 ">
          <input
            type="email"
            name='email'
            placeholder='Filter by name'
            className='px-4 py-2 border md:w-[27%] w-[60%] border-gray-300 rounded-md focus:ring-black  font-serif'
          />
          <NavLink to="/AdminCreateCompany" > <button className='bg-black text-white py-1.5 px-4 md:px-6 md:py-1.5 text-[18px] float-right rounded-lg font-serif'>New Company</button></NavLink>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-4 text-center font-serif text-lg font-medium py-3 rounded-lg font ">
          <h1>Logo</h1>
          <h1>Name</h1>
          <h1>Date</h1>
          <h1>Action</h1>
        </div>

        {/* Data Rows */}
        {jobData.map((val, index) => (
          <div key={index} className='grid grid-cols-4 text-center items-center py-4 border-b border-gray-200'>
            <h1 className='font-serif text-lg font-medium'>{val.Logo}</h1>
            <h1 className='font-serif text-lg font-medium'>{val.name}</h1>
            <h1 className='font-serif text-lg font-medium'>{val.date.toDateString()}</h1>
            <h1 className='md:ml-32 ml-14 text-lg cursor-pointer' onClick={() => showEditButton("EditPage")}>
              <BsThreeDots className='text-gray-500 hover:text-black transition-all' />

              {isEditFormVisible && (
                <div className='absolute  shadow-lg rounded-lg bg-white z-50 mt-3 -ml-10'>
                  <NavLink to="/AdminCompanyEditForm">
                    <span className='flex items-center gap-2 text-black py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-serif cursor-pointer'>
                      <FiEdit2 className='text-xl' /> Edit
                    </span>
                  </NavLink>
                </div>
              )}
            </h1>
          </div>
        ))}
      </div>

      {/* Edit Form Visibility */}

    </>
  );
};

export default Companyesshow;
