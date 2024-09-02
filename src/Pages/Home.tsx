import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Home: React.FC = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  interface Developer {
    text: string;
  }
  const slides: Developer[] = [
    { text: 'Frontend Developer' },
    { text: 'Backend Developer' },
    { text: 'Full Stack Developer' },
    { text: 'DevOps Engineer' },
    { text: 'UI/UX Designer' },
    { text: 'Data Scientist' },
    { text: 'Software Engineer' },
    { text: 'Mobile Developer' },
    { text: 'Database Administrator' },
    { text: 'Security Specialist' },
    { text: 'Cloud Engineer' },
    { text: 'System Analyst' },
    { text: 'Game Developer' },
    { text: 'Technical Writer' },
    { text: 'Research Scientist' },
    { text: 'Business Analyst' },
    { text: 'Network Engineer' },
    { text: 'Automation Engineer' },
    { text: 'Web Developer' },
    { text: 'Product Manager' },
  ];

  const slidesToShow = 3;
  const totalSlides = slides.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(totalSlides - slidesToShow, 0) : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= totalSlides - slidesToShow ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center px-4 text-center'>
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

        <div className='w-full flex items-center justify-center mt-4'>
          <input
            type="text"
            className='md:w-[42%] w-[70%] bg-white rounded-full py-[6px] px-4 shadow-md shadow-gray-400 outline-none'
            placeholder='Find Your Dream Jobs' />

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
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / slidesToShow}%`, padding: '0 10px' }} // Added padding to create space between slides
                >
                  <div className="relative w-full h-32 flex items-center justify-around">
                    <div className="absolute bottom-11 left-7 bg-opacity-50 text-black py-2 px-4 rounded-lg shadow-lg">
                      <p className="text-center font-medium">{slide.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 flex justify-center items-center p-2 bg-white text-black rounded-full hover:bg-gray-200"
            >
              &#10094;
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 flex justify-center items-center p-2 bg-white text-black rounded-full hover:bg-gray-200"
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>

      <div className='px-24'>
        <h1 className='text-purple-600 font-bold text-4xl'>Latest and Top <span className='text-black'>Job Openings</span></h1>

        <div className='w-full grid md:grid-cols-3 sm:grid-cols-1 mt-10 gap-5'>

          <div className='overflow-hidden py-2 px-4 shadow-md shadow-gray-300 rounded-[5px]'>
            <h6 className='font-sans font-medium'>Googel</h6>
            <span className='text-[12px]'>india</span>
            <h1 className='font-bold '>FullStack Developer</h1>
            <h1 className='text-[13px] font-sans mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe neque error quaerat culpa accusamus </h1>
            <hr />
            <div className='flex gap-5 mt-1 items-center'>
              <h1 className='text-blue-700 font-medium text-[13px]'>2 Position</h1>
              <h1 className='font-bold text-red-500 text-[13px]'>Full Time</h1>
              <h1 className='text-purple-600 font-bold text-[13px]'>45LPA</h1>
            </div>
          </div>   

          <div className='overflow-hidden py-2 px-4 shadow-md shadow-gray-300 rounded-lg'>
            <h6 className='font-sans font-medium'>Googel</h6>
            <span className='text-[12px]'>india</span>
            <h1 className='font-bold '>FullStack Developer</h1>
            <h1 className='text-[13px] font-sans mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe neque error quaerat culpa accusamus </h1>
            <hr />
            <div className='flex gap-5 mt-1 items-center'>
              <h1 className='text-blue-700 font-medium text-[13px]'>2 Position</h1>
              <h1 className='font-bold text-red-500 text-[13px]'>Full Time</h1>
              <h1 className='text-purple-600 font-bold text-[13px]'>45LPA</h1>
            </div>
          </div>

          <div className='overflow-hidden py-2 px-4 shadow-md shadow-gray-300 rounded-[5px]'>
            <h6 className='font-sans font-medium'>Googel</h6>
            <span className='text-[12px]'>india</span>
            <h1 className='font-bold '>FullStack Developer</h1>
            <h1 className='text-[13px] font-sans mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe neque error quaerat culpa accusamus </h1>
            <hr />
            <div className='flex gap-5 mt-1 items-center'>
              <h1 className='text-blue-700 font-medium text-[13px]'>2 Position</h1>
              <h1 className='font-bold text-red-500 text-[13px]'>Full Time</h1>
              <h1 className='text-purple-600 font-bold text-[13px]'>45LPA</h1>
            </div>
          </div>

          <div className='overflow-hidden py-2 px-4 shadow-md shadow-gray-300 rounded-lg'>
            <h6 className='font-sans font-medium'>Googel</h6>
            <span className='text-[12px]'>india</span>
            <h1 className='font-bold '>FullStack Developer</h1>
            <h1 className='text-[13px] font-sans mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe neque error quaerat culpa accusamus </h1>
            <hr />
            <div className='flex gap-5 mt-1 items-center'>
              <h1 className='text-blue-700 font-medium text-[13px]'>2 Position</h1>
              <h1 className='font-bold text-red-500 text-[13px]'>Full Time</h1>
              <h1 className='text-purple-600 font-bold text-[13px]'>45LPA</h1>
            </div>
          </div>

          <div className='overflow-hidden py-2 px-4 shadow-md shadow-gray-300 rounded-[5px]'>
            <h6 className='font-sans font-medium'>Googel</h6>
            <span className='text-[12px]'>india</span>
            <h1 className='font-bold '>FullStack Developer</h1>
            <h1 className='text-[13px] font-sans mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe neque error quaerat culpa accusamus </h1>
            <hr />
            <div className='flex gap-5 mt-1 items-center'>
              <h1 className='text-blue-700 font-medium text-[13px]'>2 Position</h1>
              <h1 className='font-bold text-red-500 text-[13px]'>Full Time</h1>
              <h1 className='text-purple-600 font-bold text-[13px]'>45LPA</h1>
            </div>
          </div>

          <div className='overflow-hidden py-2 px-4 shadow-md shadow-gray-300 rounded-[5px]'>
            <h6 className='font-sans font-medium'>Googel</h6>
            <span className='text-[12px]'>india</span>
            <h1 className='font-bold '>FullStack Developer</h1>
            <h1 className='text-[13px] font-sans mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe neque error quaerat culpa accusamus </h1>
            <hr />
            <div className='flex gap-5 mt-1 items-center'>
              <h1 className='text-blue-700 font-medium text-[13px]'>2 Position</h1>
              <h1 className='font-bold text-red-500 text-[13px]'>Full Time</h1>
              <h1 className='text-purple-600 font-bold text-[13px]'>45LPA</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
