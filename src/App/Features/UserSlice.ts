import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";
import axios from "axios";

interface CompanyData {
    id: string;
    name: string;
    logo: string;
    // other fields...
}

interface JobPostData {
    id: string;
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
    JobPost: JobPostData[]; // replace with actual JobPost structure
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
        const response = await axios.get("http://localhost:8000/User/Information", {
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

