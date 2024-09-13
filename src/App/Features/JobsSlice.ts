import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";
import axios from "axios";

interface JobsData {
    _id: string,
    description: string,
    requirements: [],
    title:string,
    salary: string,
    location: string,
    jobtype: string,
    position: string,
    experienceLevel: string,
    companyName: string,
    company: string,
    CreatedBy: string,
    applications: [],
    JobPostDate: string,
    createdAt: string,
    updatedAt: string,
    __v: string,

}

interface jobsState  {
Jobs:JobsData[]
}

const initialState : jobsState = {
    Jobs:[]
}

export const FetchingJobsData = () => async (dispatch:AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:8000/Jobs/GetAll/Jobs",{
            headers:{
                authorization:`Bearer ${localStorage.getItem("Token")}`
            }
        })
        dispatch(setJobsData(response.data)) 
    } catch (error) {
        console.log(error);       
    }
}

const JobSlice = createSlice({
    name: "Jobs",
    initialState,
    reducers: {
        setJobsData: (state, action: PayloadAction<JobsData[]>) => {
            state.Jobs = action.payload;
        },
    },
});

export const {setJobsData} = JobSlice.actions;

export default JobSlice.reducer;