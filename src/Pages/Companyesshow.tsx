import React, { useState, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../App/store/store';
import { FetchingCompanyData } from '../App/Features/CompanySlice';

interface CompanyData {
  _id: string;
  CompanyName: string;
  CompanyLogo: string,
  UserId: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  location: string;
  website: string;
  __v: number; // Add this field to match the MongoDB document structure
}

const Companyesshow: React.FC = () => {

  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [Company, SetCompany] = useState<string | null>(null);
  const CompanyRedux = useSelector((state: RootState) => state.Company.Company)
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchingCompanyData());
  }, [dispatch])

  const showEditButton = (id: string) => {
    if (id == id) {
      setCompanyId(prevId => (prevId === id ? null : id));
    }
  };

  useEffect(() => {
    const SearchCompany: CompanyData[] = companies.filter((e: CompanyData) => e.CompanyName.toLowerCase().includes(Company?.toLowerCase() ?? ""));
    if (SearchCompany.length) {
      setCompanies(SearchCompany)
    }

    if (!(Company))
      if (CompanyRedux.length) {
        setCompanies(CompanyRedux)
      }
  }, [CompanyRedux, Company, companies]) 

  console.log(companies);
  
  return (
    <>
      <div className='grid grid-cols-1 px-6 mt-7 mb-3' >
        {/* Search input and button */}
        <div className="md:px-28 mt-7 mb-3 md:p-0 p-3 " >
          <input
            type="email"
            name='email'
            placeholder='Search Company By Name '
            className='px-4 py-2 border md:w-[27%] w-[60%] border-gray-300 rounded-md focus:ring-black  font-serif'
            onChange={(e) => SetCompany(e.target.value)} />
          <NavLink to="/CreateCompanyAdmin" >
            <button className='bg-black text-white py-1.5 px-4 md:px-6 md:py-1.5 text-[18px] float-right rounded-lg font-serif'>New Company</button>
          </NavLink>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-4 text-center font-serif text-lg font-medium py-3 rounded-lg font ">
          <h1>Logo</h1>
          <h1>Name</h1>
          <h1>Date</h1>
          <h1>Action</h1>
        </div>

        {/* Data Rows */}
        {companies?.map((val, index) => (
          <div key={index} className='grid grid-cols-4 text-center items-center py-4 border-b border-gray-200' >
            <h1 className="font-serif text-lg font-medium flex justify-center items-center ">
              <img src={`http://localhost:8000/${val.CompanyLogo}`} alt={`${val.CompanyName} logo`} className='h-12 w-12 rounded-full border object-cover border-black border-x-2' />
            </h1>
            <h1 className='font-serif text-lg font-medium'>{val?.CompanyName}</h1>
            {/* <h1 className='font-serif text-lg font-medium'>{val?.createdAt?.toDateString()}</h1> */}
            <h1 className='font-serif text-lg font-medium'>
              {val?.createdAt ? new Date(val.createdAt).toLocaleDateString() : 'N/A'}
            </h1>

            <h1 className='md:ml-32 ml-14 text-lg cursor-pointer' onClick={() => showEditButton(val?._id)}>
              <BsThreeDots className='text-gray-500 hover:text-black transition-all' />
              {companyId === val._id && (
                <div className="absolute shadow-lg rounded-lg bg-white z-50 mt-3 -ml-10">
                  <NavLink to={`/EditCompany/${val._id}`}>
                    <span className="flex items-center gap-2 text-black py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-serif cursor-pointer hover:bg-black hover:text-white">
                      <FiEdit2 className="text-xl" /> Edit
                    </span>
                  </NavLink>
                </div>
              )}
            </h1>
          </div>
        ))}
      </div >

      {/* Edit Form Visibility */}

    </>
  );
};
export default Companyesshow;
