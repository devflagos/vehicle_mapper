import { AppDispatch, RootState } from "../store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;