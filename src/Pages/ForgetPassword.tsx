import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface UserResponse {
    message: string;
    user?: {
        email: string;
        _id: string
        // Add any other relevant fields
    };
    otp?: string; // Include this if your API sends back an OTP
}

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [OTP, setOTP] = useState<string>("");
    const [showOtp, setShowOtp] = useState<boolean>(false);
    const [loadingOTP, setLoadingOTP] = useState(false); // For Send OTP button
    const [verifyotp, setOtpVerify] = useState(false); // For Send OTP button

    const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
    const Navigate = useNavigate();

    // Function to handle sending OTP
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingOTP(true)
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/ForgetPassword/ForgetPassword", { email });
            const userResponse: UserResponse = response.data;
            if (response.status === 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{userResponse.message}</div>);
                setUserInfo(userResponse);
                setTimeout(() => {
                    setLoadingOTP(false)
                    setShowOtp(true);
                }, 1000);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setTimeout(() => {
                setLoadingOTP(false)
            }, 2000);
            if (error.response) {
                const errorMessage = error.response.data.message;
                toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                console.log("Error: ", errorMessage || "Unexpected error occurred.");
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    };

    console.log(userInfo);


    // Function to handle OTP verification
    const handleSubmitOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setOtpVerify(true)
        if (!OTP) {
            toast.error(<div className='font-serif text-[15px] text-black'>{"Please enter the OTP."}</div>);
            return;
        }
        if (userInfo?.otp == OTP) { // Check if the userInfo has an otp property
            toast.success(<div className='font-serif text-[15px] text-black'>{"OTP Verified successfully"}</div>);
            setTimeout(() => {
                if (userInfo?.user?._id) {
                    setOtpVerify(false)
                    Navigate(`/NewPassword/${userInfo?.user._id}`)
                }
            }, 2000)
            return
            // Add any additional actions (e.g., redirecting to reset password)
        } else {
            setTimeout(() => {
                setOtpVerify(false)
            }, 2000);
            toast.error(<div className='font-serif text-[15px] text-black'>{"Invalid OTP. Please try again."}</div>);
            return
        }
    };

    return (
        <div>
            <div className='grid grid-cols-1 place-items-center p-5'>
                <ToastContainer />
                <div className='px-5 py-5 shadow-lg shadow-gray-300 rounded-lg w-80'>
                    <h1 className='text-center font-medium font-serif text-[30px]'>Forget Password</h1>

                    {/* Email Form to Send OTP */}
                    <form onSubmit={handleSendOtp}>
                        <div className='space-y-1 font-serif'>
                            <div>
                                <label className='block text-lg text-gray-700 font-medium'>Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder='PradipJedhe@gmail.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none focus:border-transparent mb-2'
                                    required
                                />
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type='submit'
                                    className={`text-white w-full bg-gray-800 flex justify-center items-center hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-[20px] px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 font-serif ${loadingOTP ? 'cursor-not-allowed' : ''}`}
                                    disabled={loadingOTP}
                                >
                                    {loadingOTP ? (
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white rounded-full"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                    ) : null}
                                    <span>{loadingOTP ? 'Loading...' : 'Send OTP'}</span>
                                </button>
                            </div>

                        </div>
                    </form>

                    {showOtp && (
                        <>
                            {/* OTP Form to Verify */}
                            <form onSubmit={handleSubmitOtp}>
                                <div className='space-y-1 font-serif'>
                                    <div>
                                        <label className='block text-lg font-medium text-gray-700 mt-4'>OTP</label>
                                        <input
                                            type="text"
                                            name='OTP'
                                            placeholder='Enter OTP'
                                            value={OTP}
                                            onChange={(e) => setOTP(e.target.value)}
                                            className='w-full px-4 py-2.5 border border-gray-300 rounded-md 
                                            focus:ring-2 focus:ring-black focus:border-transparent outline-none 
                                            transition duration-150 ease-in-out hover:border-black 
                                            focus:bg-gray-50 bg-gray-100 placeholder-gray-400 text-black 
                                            shadow-sm hover:shadow-lg mb-2'
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <button
                                            type='submit'
                                            className={`text-white w-full bg-gray-800 flex justify-center items-center hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-[20px] px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 font-serif ${verifyotp ? 'cursor-not-allowed' : ''}`}
                                            disabled={verifyotp}
                                        >
                                            {verifyotp ? (
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 text-white rounded-full"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                    ></path>
                                                </svg>
                                            ) : null}
                                            <span>{verifyotp ? 'Loading...' : 'Verify OTP'}</span>
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </>
                    )}

                    <div className='flex'>
                        <NavLink to={"/Login"}>
                            <h1 className='mt-2 text-[13px] px-1 font-medium'>User <span className='text-blue-800 hover:underline'>Login</span></h1>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
