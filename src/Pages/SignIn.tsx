import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm, SubmitHandler, FieldError } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

interface IFormInput {
    ProfileImg: string,
    name: string,
    email: string,
    mobile: number,
    password: string,
    role: string,
    OTP: string
}

const SignIn: React.FC = () => {

    const [file, setFile] = useState<File | null>(null);
    const [OTPShow, SetOtpShow] = useState(false)
    const [loadingOTP, setLoadingOTP] = useState(false); // For Send OTP button
    const [verifyotp, setOtpVerify] = useState(false); // For Send OTP button
    const [UserEmail, SetEmail] = useState("")
    const [UserOTP, SetOTP] = useState("")
    const Navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const SendOtpForEmail = async () => {
        setLoadingOTP(true)
        const Fordata = new FormData()
        Fordata.append("email", UserEmail)
        if (!UserEmail) {
            toast.error("Email Is Required...")
        }
        try {
            const response = await axios.post("http://localhost:8000/UserSendOtp", Fordata, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const OTP = response.data;
            console.log(OTP);
            toast.success(<div className='font-serif text-[15px] text-black'>{OTP.message}</div>);
            SetOTP(OTP?.otp)
            SetOtpShow(true)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;

                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    console.log("Error: ", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
        setLoadingOTP(false)
    }

    console.log(UserOTP);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setOtpVerify(true)
        if (UserOTP == data.OTP) {
            if (!file) {
                toast.error('Please select a logo file');
                return;
            }
            const formData = new FormData();
            formData.append("ProfileImg", file); // Ensure file is not null
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("mobile", data.mobile.toString());
            formData.append("password", data.password);
            formData.append("role", data.role);

            try {
                const response = await axios.post("http://localhost:8000/User/Registration", formData);

                const UserResponse = response.data;

                if (response.status === 200) {
                    console.log("User registered successfully", UserResponse);
                    toast.success(<div className='font-serif text-[15px] text-black'>{UserResponse.message}</div>);
                    setTimeout(() => {
                        Navigate("/");
                        setOtpVerify(false)
                        const Token = UserResponse.token;
                        localStorage.setItem("Token", Token);
                    }, 1600);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setTimeout(() => {
                    setOtpVerify(false)
                }, 2000);
                if (error.response) {
                    const errorMessage = error.response.data.message;

                    if (error.response.status === 409 || errorMessage === "User already exists") {
                        console.log("Error: User already exists.");
                        toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    } else {
                        toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                        console.log("Error: ", errorMessage || "Unexpected error occurred.");
                    }
                } else {
                    console.log("Error: Network issue or server not responding", error);
                }
            }
        } else {
            toast.error("OTP doesn't match, please try again.")
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='grid grid-cols-1 place-items-center'>
                <div className='px-5 py-0 shadow-lg shadow-gray-300 rounded-lg '>
                    <h1 className='text-center font-medium font-serif text-[30px]'>SignIn</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-1'>
                            <div>
                                <label className='block text-lg font-serif text-gray-700 mb-1'>Profile</label>
                                <input
                                    {...register("ProfileImg", {
                                        required: { value: true, message: "File is required" },
                                    })}
                                    type="file"
                                    name='ProfileImg'
                                    className='w-full px-4 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent'
                                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                                {errors.ProfileImg && (
                                    <div className="text-red-500 text-lg font-serif mt-0 text-center">
                                        {errors.ProfileImg.message}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-lg font-serif text-gray-700 mb-1">Full Name</label>
                                <input
                                    {...register("name", {
                                        required: { value: true, message: "Name is required" },
                                        minLength: { value: 4, message: "Min length is 4" },
                                        maxLength: { value: 30, message: "Max length is 30" },
                                    })}
                                    type="text"
                                    name='name'
                                    placeholder="Pradip Jedhe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-lg font-serif mt-0 text-center">
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-lg font-serif text-gray-700 mb-1">Email</label>
                                <input
                                    {...register("email", {
                                        required: { value: true, message: "Email is required" },
                                        minLength: { value: 4, message: "Min length is 4" },
                                        maxLength: { value: 30, message: "Max length is 30" },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    type="text"
                                    name='email'
                                    value={UserEmail}
                                    placeholder="PradipJedhe@gmail.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none" onChange={(e) => SetEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-lg font-serif mt-0 text-center">
                                        {(errors.email as FieldError).message}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className='block text-lg font-serif text-gray-700 mb-1'>Phone</label>
                                <input
                                    {...register("mobile", {
                                        required: { value: true, message: "Phone Number is required" },
                                        min: { value: 10, message: "Phone number must be 10 digits" },
                                        maxLength: { value: 11, message: "Phone number must be 10 digits" },
                                    })}
                                    type="number"
                                    name='mobile'
                                    placeholder='8459844605'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none'
                                />
                                {errors.mobile && (
                                    <div className="text-red-500 text-lg font-serif mt-0 text-center">
                                        {(errors.mobile).message}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className='block text-lg font-serif text-gray-700 mb-1'>Password</label>
                                <input
                                    {...register("password", {
                                        required: { value: true, message: "Password is required" },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
                                            message: "Invalid password format",
                                        },
                                    })}
                                    type="password"
                                    placeholder='@$!%*?&#^'
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none focus:border-transparent ${!errors.password ? 'border-black' : ''}`}
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-sm font-serif mt-2 border border-spacing-4 border-black p-2">
                                        <p className='text-red-500'>Your password must contain:</p>
                                        <ul className="list-disc ml-5">
                                            <li>At least 8 characters</li>
                                            <li>At least 3 of the following:</li>
                                            <ul className="list-circle ml-5">
                                                <li>Lower case letters (a-z)</li>
                                                <li>Upper case letters (A-Z)</li>
                                                <li>Numbers (0-9)</li>
                                                <li>Special characters (e.g. !@#$%^&*)</li>
                                            </ul>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 p-2 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <input
                                            {...register("role", { required: "Please select a user type" })}
                                            type="radio"
                                            id="student"
                                            name='role'
                                            value="student"
                                            className="form-radio text-black focus:ring-black"
                                        />
                                        <label htmlFor="student" className="text-gray-700 font-serif">Students</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            {...register("role", { required: "Please select a user type" })}
                                            type="radio"
                                            id="recruiter"
                                            value="recruiter"
                                            name='role'
                                            className="form-radio text-black focus:ring-black"
                                        />
                                        <label htmlFor="recruiter" className="text-gray-700 font-serif">Recruiter</label>
                                    </div>
                                </div>
                                {errors.role && (
                                    <div className="text-red-500 text-lg font-serif mb-2">
                                        {errors.role.message}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type='button'
                                    onClick={SendOtpForEmail}
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


                            {OTPShow && <>

                                <div>
                                    <label className='block text-lg font-serif text-gray-700 mb-2 mt-2'>OTP</label>
                                    <input
                                        {...register("OTP")}
                                        type="text"
                                        name='OTP'
                                        placeholder='Enter Four Digit OTP'
                                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none mb-2'
                                    />
                                    {errors.OTP && ( // Fixing the error check to match "OTP"
                                        <div className="text-red-500 text-lg font-serif mt-0 text-center">
                                            {(errors.OTP).message} // Make sure "OTP" matches in the message
                                        </div>
                                    )}
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
                                        <span>{verifyotp ? 'Loading...' : 'Continue'}</span>
                                    </button>
                                </div>

                            </>
                            }

                        </div>
                        <NavLink to={"/Login"}>
                            <h1 className='mt-2 text-[14px] px-1 font-medium mb-3'>Already Have an Account? <span className='text-blue-800 hover:underline'>
                                Login</span></h1>
                        </NavLink>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn