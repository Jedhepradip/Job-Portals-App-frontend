import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";
import axios from "axios";

interface Job {
    description: string;
    requirements: [];
    salary: string;
    location: string;
    jobtype: string;
    position: string;
    experienceLevel: string;
    companyName: string;
    company: string;
    CreatedBy: string;
    title: string;
    applications: [];
    JobPostDate: string;
    createdAt: string;
    updatedAt: string;
    __v: string;
    _id: string;
}

interface applicantUser {
    job: Job[],
    applicant: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
    _id: string,
}

interface applicantJobs {
    applicant: applicantUser[]
}
const initialState: applicantJobs = {
    applicant: [],
}

export const FeachingapplicationData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:8000/Application/ApplyJob/Show/Student", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        })
        dispatch(setapplicationData(response.data))
    } catch (error) {
        console.log(error);
    }
}

const applicationSlice = createSlice({
    name: "applicant",
    initialState,
    reducers: {
        setapplicationData: (state, action: PayloadAction<applicantUser[]>) => {
            state.applicant = action.payload;
        }
    }
})

export const { setapplicationData } = applicationSlice.actions;

export default applicationSlice.reducer;