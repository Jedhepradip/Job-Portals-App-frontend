import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../App/store/store';
import { FetchingUserData } from '../App/Features/UserSlice';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

interface CompanyData {
  _id: string;
  name: string;
  logo: string;
  // other fields...
}

interface JobPostData {
  _id: string;
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

const Navbar: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [UserData, setUserData] = useState<UserInterfase1 | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = useSelector((state: RootState) => state.User.User)

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchingUserData());
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  const token = localStorage.getItem("Token");
  const LogoutUser = () => {
    localStorage.removeItem("Token")
    toggleMenu();
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 rounded-lg relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className='font-bold font-sans text-[25px] md:ml-20 ml-2'>Job<span className='text-red-500'>Hunt</span></h1>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* Conditional Links based on Role */}
              {UserData?.role === "student" ? (
                <>
                  <NavLink to="/" >
                    <li>
                      <a href="#" className="block py-2 px-3 rounded md:bg-transparent text-black md:p-0 dark:text-white md:dark:text-blue-500 md:py-1 md:px-0" aria-current="page">Home</a>
                    </li>
                  </NavLink>
                  <NavLink to="/Jobs">
                    <li>
                      <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:py-1 md:px-0">Jobs</a>
                    </li>
                  </NavLink>
                  <NavLink to="/Browse">
                    <li>
                      <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:py-1 md:px-0">Browse</a>
                    </li>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/Company">
                    <li onClick={toggleMenu}>
                      <a href="#" className="block py-2 px-3 rounded md:bg-transparent text-black md:p-0 dark:text-white md:dark:text-blue-500 md:py-1 md:px-0" aria-current="page">Company</a>
                    </li>
                  </NavLink>
                  <NavLink to="/AdminJons">
                    <li onClick={toggleMenu}>
                      <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:py-1 md:px-0">Jobs</a>
                    </li>
                  </NavLink>
                </>
              )}

              {token ? (
                <li onClick={toggleMenu}>
                  <div className='h-8 w-8 md:mr-14 md:ml-0 ml-3 rounded-full border-1 bg-black overflow-hidden border-black'>
                    <img src={`http://localhost:8000/${UserData?.ProfileImg}`} alt="Profile" className='object-cover h-full w-full' />
                  </div>
                </li>
              ) : (
                <>
                  <NavLink to="/Login">
                    <li onClick={toggleMenu}>
                      <a href="#" className="py-2 px-3 md:mt-0 mt-1 text-gray-900 md:w-full w-20 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:py-1 md:px-4 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent shadow shadow-gray-300 flex justify-center items-center">Login</a>
                    </li>
                  </NavLink>
                  <NavLink to="/SignIn">
                    <li onClick={toggleMenu}>
                      <a href="#" className="py-2 px-2 md:mt-0 mt-2 md:w-full w-20 rounded md:hover:bg-purple-600 md:hover:bg-transparent md:border-0 md:hover:text-black md:dark:hover:bg-transparent bg-purple-800 text-white md:py-1 md:px-4 flex justify-center items-center hover:shadow shadow-gray-300 hover:text-black">SignIn</a>
                    </li>
                  </NavLink>
                </>
              )}

              {isMenuOpen ? <>
                <div className=" absolute px-6 rounded-lg shadow-lg z-[500] mt-10 text-black">
                  <div className="flex items-center mb-4">
                    <img
                      src={`http://localhost:8000/${UserData?.ProfileImg}`}
                      alt="Profile"
                      className="object-cover h-12 w-12 rounded-full border-2 border-white"
                    />
                    <div className="ml-3">
                      <span className=" font-semibold text-lg">{UserData?.name}</span>
                      <p className=" text-sm text-gray-400">{UserData?.bio}</p>
                    </div>
                  </div>
                  <NavLink to="/Profile" onClick={toggleMenu}>
                    <div className="flex items-center cursor-pointer text-gray-400 py-1 rounded transition">
                      <FaUser className="mr-2 text-black text-[19px]" />
                      <span>View Profile</span>
                    </div>
                  </NavLink>
                  <div className="flex items-center cursor-pointer text-gray-400 py-1 font-medium rounded transition pb-5" onClick={() => LogoutUser()}>
                    <FaSignOutAlt className="mr-2 text-[19px] text-black" />
                    <span>Logout</span>
                  </div>
                </div>
              </>
                :
                null
              }
            </ul>
          </div>
        </div>
      </nav >
    </div >
  );
};

export default Navbar;
