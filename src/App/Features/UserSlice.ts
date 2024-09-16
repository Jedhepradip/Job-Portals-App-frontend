import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";
import axios from "axios";

interface UserData {
    _id:string,
    ProfileImg:string,
    name: string,
    email: string,
    mobile: string,
    password:string,
    role:string,
    bio:string,
    skills:[],
    ResumeFile:string,
    Company:[],
    JobPost:[],
    createdAt:string,
    updatedAt:string,
    __v:string,
}

interface UserState {
    User: UserData[];
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
        setUserData: (state, action: PayloadAction<UserData[]>) => {
            state.User = action.payload;
        },
    },
});
export const { setUserData } = UserSlice.actions;

export default UserSlice.reducer;