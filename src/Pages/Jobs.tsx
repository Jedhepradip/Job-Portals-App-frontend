import React from 'react'
import { FaRegBookmark } from 'react-icons/fa'

const Jobs: React.FC = () => {
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
              <input type="radio" id="delhi" name='Location-Filter-Jobs' className='mr-2' />
              <label htmlFor="delhi" className='font-medium'>Delhi NCR</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="bangalore" name='Location-Filter-Jobs' className='mr-2' />
              <label htmlFor="bangalore" className='font-medium'>Bangalore</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="hyderabad" name='Location-Filter-Jobs' className='mr-2' />
              <label htmlFor="hyderabad" className='font-medium'>Hyderabad</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="pune" name='Location-Filter-Jobs' className='mr-2' />
              <label htmlFor="pune" className='font-medium'>Pune</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="chennai" name='Location-Filter-Jobs' className='mr-2' />
              <label htmlFor="chennai" className='font-medium'>Chennai</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="mumbai" name='Location-Filter-Jobs' className='mr-2' />
              <label htmlFor="mumbai" className='font-medium'>Mumbai</label>
            </div>

            <h2 className='text-xl font-medium mb-0 px-2 mt-4'>Industry</h2>
            <div className='px-3'>
              <input type="radio" id="frontend" name='Industry-Filter-Jobs' className='mr-2' />
              <label htmlFor="frontend" className="font-medium">Frontend Developer</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="backend" name='Industry-Filter-Jobs' className='mr-2' />
              <label htmlFor="backend" className="font-medium">Backend Developer</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="datascience" name='Industry-Filter-Jobs' className='mr-2' />
              <label htmlFor="datascience" className="font-medium">Data Science</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="fullstack" name='Industry-Filter-Jobs' className='mr-2' />
              <label htmlFor="fullstack" className="font-medium">FullStack Developer</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="nextjs" name='Industry-Filter-Jobs' className='mr-2' />
              <label htmlFor="nextjs" className="font-medium">Nextjs Developer</label>
            </div>

            <h2 className='text-xl font-medium mb-0 px-2 mt-4'>Salary</h2>
            <div className='px-3'>
              <input type="radio" id="salary1" name='Salary-Filter-Jobs' className='mr-2' />
              <label htmlFor="salary1" className='font-medium'>0 - 40K</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="salary2" name='Salary-Filter-Jobs' className='mr-2' />
              <label htmlFor="salary2" className='font-medium'>42K to 1 lakh</label>
            </div>
            <div className='px-3'>
              <input type="radio" id="salary3" name='Salary-Filter-Jobs' className='mr-2' />
              <label htmlFor="salary3" className='font-medium'>1 lakh to 5 lakh</label>
            </div>
          </div>

          <div className='md:col-span-9 col-span-12 bg-white p-6 rounded-lg'>
            <div className='grid grid-cols-12 gap-4 p-4 '>
              <div className='col-span-12 grid md:grid-cols-3 gap-5 '>
                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-6'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <FaRegBookmark />
                  </div>
                  <div className='flex'>
                    <div>
                      <img src="" alt="Company Logo" className='h-12 w-12 rounded-lg' />
                    </div>
                    <div className='px-3'>
                      <h1 className='font-sans font-bold text-[14px]'>Googel</h1>
                      <h1 className='font-sans text-[11px] text-gray-500'>India</h1>
                    </div>
                  </div>
                  <h1 className='py-1 font-bold text-[19px]'>FullStack Devloper</h1>
                  <p className='font-sans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto eveniet vero</p>

                  <div className='flex justify-between items-center mt-3'>
                    <h1 className='text-blue-800 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>2 Postion</h1>
                    <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>Full Time</h1>
                    <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>34LPA</h1>
                  </div>

                  <div className='mt-3'>
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Details</button>

                    <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save For Later</button>
                  </div>

                </div>

                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-6'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <FaRegBookmark />
                  </div>
                  <div className='flex'>
                    <div>
                      <img src="" alt="Company Logo" className='h-12 w-12 rounded-lg' />
                    </div>
                    <div className='px-3'>
                      <h1 className='font-sans font-bold text-[14px]'>Googel</h1>
                      <h1 className='font-sans text-[11px] text-gray-500'>India</h1>
                    </div>
                  </div>
                  <h1 className='py-1 font-bold text-[19px]'>FullStack Devloper</h1>
                  <p className='font-sans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto eveniet vero</p>

                  <div className='flex justify-around items-center mt-3'>
                    <h1 className='text-blue-800 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>2 Postion</h1>
                    <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>Full Time</h1>
                    <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>34LPA</h1>
                  </div>

                  <div className='mt-3'>
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Details</button>

                    <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save For Later</button>
                  </div>

                </div>


                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-6'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <FaRegBookmark />
                  </div>
                  <div className='flex'>
                    <div>
                      <img src="" alt="Company Logo" className='h-12 w-12 rounded-lg' />
                    </div>
                    <div className='px-3'>
                      <h1 className='font-sans font-bold text-[14px]'>Googel</h1>
                      <h1 className='font-sans text-[11px] text-gray-500'>India</h1>
                    </div>
                  </div>
                  <h1 className='py-1 font-bold text-[19px]'>FullStack Devloper</h1>
                  <p className='font-sans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto eveniet vero</p>

                  <div className='flex justify-around items-center mt-3'>
                    <h1 className='text-blue-800 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>2 Postion</h1>
                    <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>Full Time</h1>
                    <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>34LPA</h1>
                  </div>

                  <div className='mt-3'>
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Details</button>

                    <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save For Later</button>
                  </div>

                </div>


                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-6'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <FaRegBookmark />
                  </div>
                  <div className='flex'>
                    <div>
                      <img src="" alt="Company Logo" className='h-12 w-12 rounded-lg' />
                    </div>
                    <div className='px-3'>
                      <h1 className='font-sans font-bold text-[14px]'>Googel</h1>
                      <h1 className='font-sans text-[11px] text-gray-500'>India</h1>
                    </div>
                  </div>
                  <h1 className='py-1 font-bold text-[19px]'>FullStack Devloper</h1>
                  <p className='font-sans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto eveniet vero</p>

                  <div className='flex justify-around items-center mt-3'>
                    <h1 className='text-blue-800 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>2 Postion</h1>
                    <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>Full Time</h1>
                    <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>34LPA</h1>
                  </div>

                  <div className='mt-3'>
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Details</button>

                    <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save For Later</button>
                  </div>

                </div>


                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-6'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <FaRegBookmark />
                  </div>
                  <div className='flex'>
                    <div>
                      <img src="" alt="Company Logo" className='h-12 w-12 rounded-lg' />
                    </div>
                    <div className='px-3'>
                      <h1 className='font-sans font-bold text-[14px]'>Googel</h1>
                      <h1 className='font-sans text-[11px] text-gray-500'>India</h1>
                    </div>
                  </div>
                  <h1 className='py-1 font-bold text-[19px]'>FullStack Devloper</h1>
                  <p className='font-sans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto eveniet vero</p>

                  <div className='flex justify-around items-center mt-3'>
                    <h1 className='text-blue-800 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>2 Postion</h1>
                    <h1 className='text-red-500 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>Full Time</h1>
                    <h1 className='text-purple-700 px-3 font-bold rounded-lg text-[13px] shadow shadow-gray-300'>34LPA</h1>
                  </div>

                  <div className='mt-3'>
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Details</button>

                    <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save For Later</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Jobs

