import React, { useEffect, useState } from 'react'
import { FaRegBookmark } from 'react-icons/fa'
import { RootState, AppDispatch } from '../App/store/store'
import { useSelector, useDispatch } from 'react-redux'
import { FetchingJobsData } from '../App/Features/JobsSlice'
import { NavLink } from 'react-router-dom'

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

const Jobs: React.FC = () => {
  const [Jobsdefualt, SetupCompanyJobs] = useState<Job[]>([]);
  const JobsData = useSelector((state: RootState) => state.Jobs.Jobs);
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(FetchingJobsData())
  }, [dispatch])
  useEffect(() => {
    SetupCompanyJobs(JobsData)
  }, [JobsData])


  const SearchingByLocations = (location: string) => {
    const searchbylocationjobs: Job[] = JobsData.filter((e: Job) => e.location.toLowerCase() == location.toLowerCase())
    if (searchbylocationjobs.length) {
      SetupCompanyJobs(searchbylocationjobs)
    } else {
      SetupCompanyJobs([])
    }
  }

  const searchbyIndustry = (Industry: string) => {
    const searchbyIndustryJobs: Job[] = JobsData.filter((e: Job) => e.title.toLowerCase().includes(Industry.toLowerCase()))
    if (searchbyIndustryJobs.length > 0) {
      SetupCompanyJobs(searchbyIndustryJobs)
    } else {
      SetupCompanyJobs([])
    }
  }

  const searchbysalary = (salary: string) => {
    const salaryNumber = parseFloat(salary);
    let searchbusalaryjobs: Job[] = [];
    if (salaryNumber >= 10 && salaryNumber <= 20) {
      searchbusalaryjobs = JobsData.filter((e: Job) => e.salary >= "10" && e.salary <= "20");
    } else if (salaryNumber > 20 && salaryNumber <= 30) {
      searchbusalaryjobs = JobsData.filter((e: Job) => e.salary > "20" && e.salary <= "30");
    } else if (salaryNumber > 30 && salaryNumber <= 40) {
      searchbusalaryjobs = JobsData.filter((e: Job) => e.salary > "30" && e.salary <= "40");
    } else {
      console.log("No jobs available in this salary range.");
    }
    SetupCompanyJobs(searchbusalaryjobs);
  };


  return (
    <>
      <div className='bg-gray-300'>
        <div className='grid grid-cols-12 gap-4 p-4'>
          {/* Filter Section */}
          <div className='md:col-span-3 col-span-12 bg-white p-6 rounded-lg'>
            <h1 className='font-bold text-center text-[25px]'>Filter Jobs</h1>
            <hr />
            <h2 className='text-xl font-medium mb-4 px-2'>Location</h2>
            <div className='px-3'>
              <input type="radio" id="delhi" name='Location-Filter-Jobs' className='mr-2' onClick={() => SearchingByLocations("Delhi NCR")} />
              <label htmlFor="delhi" className='font-medium'>Delhi NCR</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="bangalore" name='Location-Filter-Jobs' className='mr-2' onClick={() => SearchingByLocations("Bangalore")} />
              <label htmlFor="bangalore" className='font-medium'>Bangalore</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="hyderabad" name='Location-Filter-Jobs' className='mr-2' onClick={() => SearchingByLocations("Hyderabad")} />
              <label htmlFor="hyderabad" className='font-medium'>Hyderabad</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="pune" name='Location-Filter-Jobs' className='mr-2' onClick={() => SearchingByLocations("Pune")} />
              <label htmlFor="pune" className='font-medium'>Pune</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="chennai" name='Location-Filter-Jobs' className='mr-2' onClick={() => SearchingByLocations("Chennai")} />
              <label htmlFor="chennai" className='font-medium'>Chennai</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="mumbai" name='Location-Filter-Jobs' className='mr-2' onClick={() => SearchingByLocations("Mumbai")} />
              <label htmlFor="mumbai" className='font-medium'>Mumbai</label>
            </div>

            <h2 className='text-xl font-medium mb-0 px-2 mt-4'>Industry</h2>
            <div className='px-3'>
              <input type="radio" id="frontend" name='Location-Filter-Jobs' className='mr-2' onClick={() => searchbyIndustry("Frontend developer")} />
              <label htmlFor="frontend" className="font-medium">Frontend Developer</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="backend" name='Location-Filter-Jobs' className='mr-2' onClick={() => searchbyIndustry("Backend developer")} />
              <label htmlFor="backend" className="font-medium">Backend Developer</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="datascience" name='Location-Filter-Jobs' className='mr-2' onClick={() => searchbyIndustry("Data Science")} />
              <label htmlFor="datascience" className="font-medium">Data Science</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="fullstack" name='Location-Filter-Jobs' className='mr-2' onClick={() => searchbyIndustry("Full Stack developer")} />
              <label htmlFor="fullstack" className="font-medium">FullStack Developer</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="nextjs" name='Location-Filter-Jobs' className='mr-2' onClick={() => searchbyIndustry("Next.js developer")} />
              <label htmlFor="nextjs" className="font-medium">Nextjs Developer</label>
            </div>

            <h2 className='text-xl font-medium mb-0 px-2 mt-4'>Salary</h2>
            <div className='px-3'>
              <input type="radio" id="salary1" name='Location-Filter-Jobs' className='mr-2' onClick={() => searchbysalary("20")} />
              <label htmlFor="salary1" className='font-medium'>10 to 20 lakh</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="salary2" name='Location-Filter-Jobs' className='mr-2' onClick={() => searchbysalary("30")} />
              <label htmlFor="salary2" className='font-medium'>20 to 30 lakh</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="salary3" name='Location-Filter-Jobs' className='mr-2' onClick={() => searchbysalary("40")} />
              <label htmlFor="salary3" className='font-medium'>30 lakh to  40lakh</label>
            </div>
          </div>

          <div className='md:col-span-9 col-span-12 bg-white shadow-gray-300 p-5 rounded-lg'>
            <div className='grid grid-cols-12'>
              <div className='col-span-12 grid md:grid-cols-3 gap-5 cursor-pointer'>

                {Jobsdefualt.length ? (
                  <>
                    {Jobsdefualt.map((val, index) => (
                      <div key={index} className='py-3 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-10'>
                        <div className='flex justify-between items-center mb-3'>
                          <h1 className='font-medium'>Today</h1>
                          <div className='h-8 w-8 flex justify-center items-center p-1 bg-gray-100 rounded-full'>
                            <FaRegBookmark className='text-[18px]' />
                          </div>
                        </div>
                        <div className='flex'>
                          <div>
                            <img src={`http://localhost:8000`} alt="Company Logo" className='h-12 w-12 rounded-lg' />
                          </div>
                          <div className='px-3'>
                            <h1 className='font-sans font-bold text-[14px]'>{val.companyName}</h1>
                            <h1 className='font-sans text-[11px] text-gray-500'>{val.location}</h1>
                          </div>
                        </div>
                        <h1 className='py-1 font-bold text-[19px]'>{val.title}</h1>
                        <p className='font-serif'>{val.description}</p>
                        <div className='flex justify-between items-center mt-3'>
                          <h1 className='text-blue-800 px-2 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{`${val.position} Position`}</h1>
                          <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{val.jobtype}</h1>
                          <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>{`${val.salary} LPA`}</h1>
                        </div>
                        <div className='mt-3'>
                          <NavLink to={`/JobsDetails/${val._id}`}>
                            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Details</button>
                          </NavLink>
                          <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save For Later</button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className='h-screen flex justify-center items-center'>
                      <h1 className='text-blue-800 hover:underline text-2xl px-2 mt-10 font-serif text-center'>Jobs Not Found...</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Jobs

