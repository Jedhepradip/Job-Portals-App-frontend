import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const AdminCompany: React.FC = () => {

  const [isEditFormVisible, setEditFormVisible] = useState(false)

  interface JobDataInfo {
    Logo: string;
    name: string;
    date: Date;
  }

  const jobData: JobDataInfo[] = [
    { date: new Date('2024-09-01'), Logo: 'xyzimg', name: 'google' },
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
            placeholder='Filter by name'
            className='px-4 py-2 border border-gray-300 rounded-md focus:ring-black  font-serif'
          />
          <NavLink to="/AdminCreateCompany" > <button className='bg-black text-white py-1.5 px-4 md:px-6 md:py-1.5 text-[18px] float-right rounded-lg font-serif'>New Company</button></NavLink>
        </div>

        <div className="md:px-32 mt-7 mb-1 md:p-0 p-3 flex justify-between items-center grid grid-cols-4">
          <h1 className='font-serif text-[20px] font-medium'>Logo</h1>
          <h1 className='font-serif text-[20px] font-medium'>Name</h1>
          <h1 className='font-serif text-[20px] font-medium'>Date</h1>
          <h1 className='font-serif text-[20px] font-medium'>Action</h1>

          {jobData.map((val, index) => (
            <div key={index} className='flex gap-[195px] mt-4'>
              <h1 className='font-serif text-[20px] font-medium'>{val.Logo}</h1>
              <h1 className='font-serif text-[20px] font-medium'>{val.name}</h1>
              <h1 className='font-serif text-[20px] font-medium'>123</h1>
              <h1 className='font-serif text-[20px] font-medium ml-20 cursor-pointer' onClick={() => showeditbutton("EditPage")}><BsThreeDots /> </h1>
            </div>
          ))}

        </div>
      </div>

      {isEditFormVisible &&
        <>
          <NavLink to="/AdminCompanyEditForm" >
            <div className='px-80 w-full absolute'>
              <span className='py-1 px-2.5 ml-20 gap-1 flex rounded-lg float-right text-black font-serif shadow shadow-gray-300 text-[20px] cursor-pointer'> <FiEdit2 className='text-[18px] mt-1' /> Edit</span>
            </div></NavLink>
        </>}

    </>
  )
}

export default AdminCompany
