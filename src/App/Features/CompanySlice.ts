import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store/store';
import axios from 'axios';


interface CompanyData {
    _id: string;
    CompanyName: string;
    UserId: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    location: string;
    website: string;
    __v: number; // Add this field to match the MongoDB document structure
}


interface CompanyState {
    Company: CompanyData[]
}

const initialState: CompanyState = {
    Company: [],
}


export const FetchingCompanyData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:8000/Company/get", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
        })
        dispatch(setCompanyData(response.data.companies));
    } catch (error) {
        console.log(error);
    }
}

const CompanySlice = createSlice({
    name: 'Company',
    initialState,
    reducers: {
        setCompanyData: (state, action: PayloadAction<CompanyData[]>) => {
            state.Company = action.payload;
        },        
    },
});

export const { setCompanyData } = CompanySlice.actions;

export default CompanySlice.reducer;
