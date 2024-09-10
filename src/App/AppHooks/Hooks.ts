import { useSelector,useDispatch } from "react-redux";
import type { RootState,AppDispatch } from "../store/store";

export const UseAppDispatch = useDispatch.withTypes<AppDispatch>()
export const UseAppSelector = useSelector.withTypes<RootState>()