import React from 'react'

const AdminNewJobsPost: React.FC = () => {
    return (
        <>
            <div className='grid place-items-center'>
                <div className='grid grid-cols-1 shadow shadow-gray-300 rounded-lg'>
                    <form>
                        <table className='w-full mt-1'>
                            <div className='space-y-2 py-6 px-4'>
                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Title</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Description</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr>

                                <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Requirements</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Salary <span className='text-[12px] text-gray-400'>(in LPA)</span></label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Location</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Job Type</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Experience Level <span className='text-[12px] text-gray-400'>(in Years)</span></label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                    <td className="w-[50%]">
                                        <label className='block text-lg font-medium font-serif text-gray-700 px-1'>No Of Position</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        />
                                    </td>
                                </tr> <tr className='flex items-center space-x-2'>
                                    <td className="w-[50%]">
                                        {/* <label className='block text-lg font-medium font-serif text-gray-700 px-1'>Select a Company</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-black  font-serif'
                                        /> */}
                                        <select className='block text-lg font-medium py-2 px-4 font-serif text-gray-700 border border-gray-300 rounded-lg'>
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

export default AdminNewJobsPost
