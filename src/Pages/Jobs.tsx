import React from 'react'

const Jobs: React.FC = () => {
  return (
    <>
      <div className='bg-gray-100 py-10'>
        <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8'>
          <h1 className='text-2xl font-semibold text-center mb-6'>Filter Jobs</h1>
          <hr className='mb-8' />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

            {/* Location Filter */}
            <div className='p-4 bg-red-100 rounded-lg'>
              <h2 className='text-xl font-medium mb-4'>Location</h2>
              <div className='space-y-2'>
                <div>
                  <input type="radio" id="delhi" name='Location-Filter-Jobs' className='mr-2' />
                  <label htmlFor="delhi">Delhi NCR</label>
                </div>
                <div>
                  <input type="radio" id="bangalore" name='Location-Filter-Jobs' className='mr-2' />
                  <label htmlFor="bangalore">Bangalore</label>
                </div>
                <div>
                  <input type="radio" id="hyderabad" name='Location-Filter-Jobs' className='mr-2' />
                  <label htmlFor="hyderabad">Hyderabad</label>
                </div>
                <div>
                  <input type="radio" id="pune" name='Location-Filter-Jobs' className='mr-2' />
                  <label htmlFor="pune">Pune</label>
                </div>
                <div>
                  <input type="radio" id="chennai" name='Location-Filter-Jobs' className='mr-2' />
                  <label htmlFor="chennai">Chennai</label>
                </div>
                <div>
                  <input type="radio" id="mumbai" name='Location-Filter-Jobs' className='mr-2' />
                  <label htmlFor="mumbai">Mumbai</label>
                </div>
              </div>
            </div>

            {/* Industry Filter */}
            <div className='p-4 bg-blue-100 rounded-lg'>
              <h2 className='text-xl font-medium mb-4'>Industry</h2>
              <div className='space-y-2'>
                <div>
                  <input type="radio" id="frontend" name='Industry' className='mr-2' />
                  <label htmlFor="frontend">Frontend Developer</label>
                </div>
                <div>
                  <input type="radio" id="backend" name='Industry' className='mr-2' />
                  <label htmlFor="backend">Backend Developer</label>
                </div>
                <div>
                  <input type="radio" id="datascience" name='Industry' className='mr-2' />
                  <label htmlFor="datascience">Data Science</label>
                </div>
                <div>
                  <input type="radio" id="fullstack" name='Industry' className='mr-2' />
                  <label htmlFor="fullstack">FullStack Developer</label>
                </div>
                <div>
                  <input type="radio" id="nextjs" name='Industry' className='mr-2' />
                  <label htmlFor="nextjs">Nextjs Developer</label>
                </div>
              </div>
            </div>

            {/* Salary Filter */}
            <div className='p-4 bg-green-100 rounded-lg'>
              <h2 className='text-xl font-medium mb-4'>Salary</h2>
              <div className='space-y-2'>
                <div>
                  <input type="radio" id="salary1" name='Salary' className='mr-2' />
                  <label htmlFor="salary1">0 - 40K</label>
                </div>
                <div>
                  <input type="radio" id="salary2" name='Salary' className='mr-2' />
                  <label htmlFor="salary2">42K to 1 lakh</label>
                </div>
                <div>
                  <input type="radio" id="salary3" name='Salary' className='mr-2' />
                  <label htmlFor="salary3">1 lakh to 5 lakh</label>
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
