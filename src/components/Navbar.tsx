import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../App/store/store';
import { FetchingUserData } from '../App/Features/UserSlice';
import { FaUser, FaSignOutAlt, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
  const [Profile, SetProfile] = useState(false);
  const [UserData, setUserData] = useState<UserInterfase1 | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = useSelector((state: RootState) => state.User.User)
  const Navigate = useNavigate()

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
    Navigate("/")
    SetProfileUser()
    toggleMenu();
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const SetProfileUser = () => {
    SetProfile(!Profile)
  }

  return (
    <>
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
                  <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                    <li>
                      <a href="#" className="block py-2 px-3 rounded md:bg-transparent text-black md:p-0 dark:text-white md:dark:text-blue-500 md:py-1 md:px-0" aria-current="page">Home</a>
                    </li>
                  </NavLink>
                  <NavLink to="/Jobs" onClick={() => setIsMenuOpen(false)}>
                    <li>
                      <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:py-1 md:px-0">Jobs</a>
                    </li>
                  </NavLink>
                  <NavLink to="/Browse" onClick={() => setIsMenuOpen(false)}>
                    <li>
                      <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:py-1 md:px-0">Browse</a>
                    </li>
                  </NavLink>
                </>
              ) : (
                <>
                  {!(UserData?.role == "recruiter" || localStorage.getItem("Token")) ?
                    <>
                      <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                        <li>
                          <a href="#" className="block py-2 px-3 rounded md:bg-transparent text-black md:p-0 dark:text-white md:dark:text-blue-500 md:py-1 md:px-0" aria-current="page">Home</a>
                        </li>
                      </NavLink>
                      <NavLink to="/Jobs" onClick={() => setIsMenuOpen(false)}>
                        <li>
                          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:py-1 md:px-0">Jobs</a>
                        </li>
                      </NavLink>
                      <NavLink to="/Browse" onClick={() => setIsMenuOpen(false)}>
                        <li>
                          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:py-1 md:px-0">Browse</a>
                        </li>
                      </NavLink>
                    </>
                    :
                    <>
                      <NavLink to="/Company" onClick={() => setIsMenuOpen(false)}>
                        <li>
                          <a href="#" className="block py-2 px-3 rounded md:bg-transparent text-black md:p-0 dark:text-white md:dark:text-blue-500 md:py-1 md:px-0" aria-current="page">Company</a>
                        </li>
                      </NavLink>
                      <NavLink to="/AdminJons" onClick={() => setIsMenuOpen(false)}>
                        <li>
                          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:py-1 md:px-0">Jobs</a>
                        </li>
                      </NavLink></>
                  }
                </>
              )}

              {token ? (
                <li>
                  <div className='h-8 w-8 md:mr-14 md:ml-0 ml-3 md:mt-0 mt-2 rounded-full border-1 bg-black overflow-hidden border-black'>
                    <img src={UserData?.ProfileImg}
                      alt="Profile" className='object-cover h-full w-full ' onClick={() => SetProfileUser()} />
                  </div>
                </li>
              ) : (
                <>
                  <NavLink to="/Login">
                    <li onClick={() => setIsMenuOpen(false)}>
                      <a href="#" className="py-2 px-3 md:mt-0 mt-1 text-gray-900 md:w-full w-20 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:py-1 md:px-4 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent shadow shadow-gray-300 flex justify-center items-center">Login</a>
                    </li>
                  </NavLink>
                  <NavLink to="/SignIn">
                    <li onClick={() => setIsMenuOpen(false)}>
                      <a href="#" className="py-2 px-2 md:mt-0 mt-2 md:w-full w-20 rounded md:hover:bg-purple-600 md:hover:bg-transparent md:border-0 md:hover:text-black md:dark:hover:bg-transparent bg-purple-800 text-white md:py-1 md:px-4 flex justify-center items-center hover:shadow shadow-gray-300 hover:text-black">SignIn</a>
                    </li>
                  </NavLink>
                </>
              )}

              {Profile ? (
                <>
                  <div className="absolute cursor-pointer rounded-lg shadow-lg shadow-gray-400 bg-gray-50 z-50 md:mt-12 mt-[180px] text-black p-2">
                    <div className="flex items-center mb-2 px-4 py-2" onClick={toggleMenu}>
                      <img
                        src={UserData?.ProfileImg}
                        alt="Profile"
                        className="object-cover h-12 w-12 rounded-full border-2 border-white"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-lg text-black">
                          {UserData?.name}
                        </span>
                        <p className="text-sm text-gray-600 font-medium">{UserData?.bio}</p>
                      </div>
                    </div>
                    <NavLink to="/Profile" onClick={SetProfileUser}>
                      <div className="flex items-center cursor-pointer hover:bg-gradient-to-r from-purple-600 to-indigo-600 text-gray-600 py-2 px-4 font-medium rounded-md transition duration-300 ease-in-out hover:text-white">
                        <div className="text-black flex hover:text-white">
                          <FaUser className="mr-2 text-[19px]" />
                          <span>View Profile</span>
                        </div>
                      </div>
                    </NavLink>

                    <NavLink to="/SaveJobs" onClick={SetProfileUser} >
                      <div className="flex items-center cursor-pointer hover:bg-gradient-to-r from-purple-600 to-indigo-600 text-gray-600 py-2 px-4 font-medium rounded-md transition duration-300 ease-in-out hover:text-white">
                        <div className="text-black flex hover:text-white">
                          <FaSave className="mr-2 text-[19px]" />
                          <span>Save Jobs</span>
                        </div>
                      </div>
                    </NavLink>

                    <div
                      className="flex items-center cursor-pointer hover:bg-gradient-to-r from-purple-600 to-indigo-600 text-gray-600 py-2 px-4 font-medium rounded-md transition duration-300 ease-in-out mb-2 hover:text-white"
                      onClick={() => LogoutUser()}>
                      <div className="text-black hover:text-white flex">
                        <FaSignOutAlt className="mr-2 text-[19px] hover:text-white mt-1" />
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav >
    </ >
  );
};

export default Navbar;

