import React from 'react'
import { FaRegBookmark } from 'react-icons/fa'

const Browse:React.FC = () => {
  return (
    <>
    <h1 className='px-20 font-bold text-[30px] mt-10'>Search Results(6)</h1>
       <div className='md:col-span-9 col-span-12 bg-white shadow-gray-300 p-5 rounded-lg px-20'>
            <div className='grid grid-cols-12'>
              <div className='col-span-12 grid md:grid-cols-3 gap-5 '>
                <div className='py-3 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-10'>
                  <div className='flex justify-between items-center mb-3'>
                    <h1 className='font-medium'>Today</h1>
                    <div className='h-8 w-8 flex justify-center items-center p-1 bg-gray-100  rounded-full'>
                      <FaRegBookmark className='text-[18px]' />
                    </div>
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

                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-10'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <div className='h-8 w-8 flex justify-center items-center p-1 bg-gray-100  rounded-full'>
                      <FaRegBookmark className='text-[18px]' />
                    </div>
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


                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-10'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <div className='h-8 w-8 flex justify-center items-center p-1 bg-gray-100  rounded-full'>
                      <FaRegBookmark className='text-[18px]' />
                    </div>
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


                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-10'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <div className='h-8 w-8 flex justify-center items-center p-1 bg-gray-100  rounded-full'>
                      <FaRegBookmark className='text-[18px]' />
                    </div>
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


                <div className='py-5 px-5 shadow-md shadow-gray-300 rounded-lg overflow-hidden mb-10'>
                  <div className='flex justify-between items-center mb-4'>
                    <h1 className='font-medium'>Today</h1>
                    <div className='h-8 w-8 flex justify-center items-center p-1 bg-gray-100  rounded-full'>
                      <FaRegBookmark className='text-[18px]' />
                    </div>
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
    </>
  )
}

export default Browse
