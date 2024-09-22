import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RootState, AppDispatch } from '../App/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FetchingJobsData } from '../App/Features/JobsSlice';
import { NavLink } from 'react-router-dom';
import { setJobs } from '../App/Features/JobsSlice';
import Companyesshow from './Companyesshow';
import { FetchingUserData } from '../App/Features/UserSlice';

interface CompanyData {
  id: string;
  name: string;
  logo: string;
  // other fields...
}

interface JobPostData {
  id: string;
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

const Home: React.FC = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [Jobsdefualt, SetupCompanyJobs] = useState<Job[]>([]);
  const [searchJobs, SetSeachdataJobs] = useState<Job[]>([]);
  const [UserData, setUserData] = useState<UserInterfase1 | null>(null);
  const [Search, SearchJobs] = useState(String);
  const JobsData = useSelector((state: RootState) => state.Jobs.Jobs);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const User: any = useSelector((state: RootState) => state.User.User);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchingJobsData())
    dispatch(FetchingUserData())
  }, [dispatch])

  useEffect(() => {
    if (JobsData.length) {
      SetupCompanyJobs(JobsData)
    }
  }, [JobsData])

  useEffect(() => {
    if (User) {
      setUserData(User)
    }
  }, [User])


  useEffect(() => {
    const SearchJobsShow: Job[] = JobsData.filter((e: Job) =>
      e.title.toLowerCase().includes(Search.toLowerCase())
    );
    SetSeachdataJobs(SearchJobsShow)
  }, [JobsData, Search])


  const handelJobsId = (id: string) => {
    const Jobstroed: Job[] = JobsData.filter((e: Job) => e._id == id)
    dispatch(setJobs(Jobstroed))
  }

  const slidesToShow = 3;
  const totalSlides = Jobsdefualt.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(totalSlides - slidesToShow, 0) : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= totalSlides - slidesToShow ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div>
        {!(UserData?.role == "student") ?
          <>
            <div className='flex flex-col justify-center items-center px-4 text-center relative'>
              <div className='mb-6'>
                <h1 className='bg-slate-100 text-red-500 py-1.5 px-4 font-medium rounded-full'>
                  No. 1 Job Hunt Website
                </h1>
              </div>
              <div className='font-bold text-[40px] leading-tight'>
                <h1>Search, Apply &</h1>
                <h1>
                  Get Your <span className='text-purple-800'>Dream Job</span>
                </h1>
              </div>
              <p className='mt-4 max-w-xl text-gray-600 font-sans'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quae laboriosam odit aperiam ipsam sit fugit maiores modi error a saepe neque,
              </p>

              <div className='w-full flex items-center justify-center mt-4 relative'>
                <input
                  type="text"
                  className='md:w-[42%] w-[70%] bg-white rounded-full py-[6px] px-4 shadow-md shadow-gray-400 outline-none'
                  placeholder='Find Your Dream Jobs' onChange={(e) => SearchJobs(e.target.value)} />
                ,
                {Search && <>
                  <div className=' py-1 bg-white text-black absolute rounded-lg overflow-hidden z-50 mt-28'>
                    {searchJobs?.map((val, index) => (
                      <NavLink to={"/Browse"} >
                        <h1 key={index} className='font-serif text-[22px] mt-1 p-1 shadow shadow-gray-300 px-10 py-2 rounded-lg' onClick={() => handelJobsId(val._id)}>
                          {val?.title}
                        </h1>
                      </NavLink>
                    ))}
                  </div>
                </>}

                <div className='flex justify-center items-center w-10 h-[36px] absolute bg-purple-800 rounded-r-full text-white md:ml-[490px] ml-[300px]'>
                  <FaSearch size={18} />
                </div>
              </div>

              <div className="relative w-full max-w-3xl mx-auto">
                <div className="overflow-hidden bg-white w-full p-5 mt-2">
                  <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)` }}
                  >
                    {Jobsdefualt.map((slide, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0"
                        style={{ width: `${100 / slidesToShow}%`, padding: '0 10px' }} // Added padding to create space between slides
                      >
                        <div className="relative w-full h-32 flex items-center justify-around">
                          <div className="absolute bottom-11 left- bg-opacity-50 text-black py-2 px-4 rounded-lg shadow-lg">
                            <NavLink to={`/JobsDetails/${slide._id}`} >
                              <p className="text-center font-medium font-serif">{slide.title}</p>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 flex justify-center items-center p-2 bg-white text-black rounded-full hover:bg-gray-200">
                    &#10094;
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 flex justify-center items-center p-2 bg-white text-black rounded-full hover:bg-gray-200">
                    &#10095;
                  </button>
                </div>
              </div>
            </div>

            <div className='px-14 py-1'>
              <h1 className='text-purple-600 font-bold text-4xl'>Latest and Top <span className='text-black'>Job Openings</span></h1>
              <div className='w-full grid md:grid-cols-3 sm:grid-cols-1 mt-10 gap-5'>
                {Jobsdefualt.slice(0, 6).map((val, index) => (
                  <div key={index} className='overflow-hidden py-2 px-4 shadow-md shadow-gray-300 rounded-[5px]'>
                    <NavLink to={`/JobsDetails/${val._id}`} >
                      <h6 className='font-sans font-medium'>{val.companyName}</h6>
                      <span className='text-[12px]'>{val.location}</span>
                      <h1 className='font-bold '>{val.title}</h1>
                      <h1 className='text-[13px] font-sans mb-3'>{val.description}</h1>
                      <hr />
                      <div className='flex gap-5 mt-1 items-center'>
                        <h1 className='text-blue-700 font-medium text-[13px]'>{val.position} Position</h1>
                        <h1 className='font-bold text-red-500 text-[13px]'>{val.jobtype}</h1>
                        <h1 className='text-purple-600 font-bold text-[13px]'>{val.salary} LPA</h1>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </>

          :

          <Companyesshow />
        }

      </div>
    </>
  );
}

export default Home;
