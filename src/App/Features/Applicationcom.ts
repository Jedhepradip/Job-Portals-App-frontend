import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";
import axios from "axios";

interface applicantUser {
    job: string,
    applicant: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
}

interface applicantJobs {
    applicant: applicantUser[]
}
const initialState: applicantJobs = {
    applicant: []
}

export const ferchingApplicationcom = async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:8000/Application/ApplyJob/Show/Student", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        })
        dispatch(setapplicationData(response.data))
        const applyJobsData = await response.data;
        console.log(applyJobsData);
    } catch (error) {
        console.log(error);
    }
}


const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setapplicationData: (state, action: PayloadAction<applicantUser[]>) => {
            state.applicant = action.payload;
        }
    }
})

export const { setapplicationData } = applicationSlice.actions;

export default applicationSlice.reducer;