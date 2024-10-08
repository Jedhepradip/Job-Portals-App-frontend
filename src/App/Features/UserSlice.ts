import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";
import axios from "axios";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    company: string | any,
    CreatedBy: string,
    title: string,
    applications: [],
    JobPostDate: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
}

interface CompanyData {
    _id: string;
    name: string;
    logo: string;
    // other fields...
}

interface JobPostData {
    _id: string;
    title: string;
    description: string;
    // other fields...
}

interface UserInterFaceData {
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
    JobPost: JobPostData[];
    SaveJobs: Job[] // replace with actual JobPost structure
    createdAt: string;
    updatedAt: string;
    __v: string;
}

interface UserState {
    User: UserInterFaceData[];
}

const initialState: UserState = {
    User: []
}

export const FetchingUserData = () => async (dispatch: AppDispatch) => {

    try {
        // const response = await axios.get("http://localhost:8000/User/Information", {
        const response = await axios.get("https://job-portal-app-backend-zm6q.onrender.com/User/Information", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        })
        dispatch(setUserData(response.data))
    } catch (error) {
        console.log(error);
    }
}

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserInterFaceData[]>) => {
            state.User = action.payload;
        },
    },
});
export const { setUserData } = UserSlice.actions;

export default UserSlice.reducer;

