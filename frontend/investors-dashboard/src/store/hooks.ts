import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "./store"
import {ThunkDispatch} from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppDispatch, any, any>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
