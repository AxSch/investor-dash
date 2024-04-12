import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "./store"
import {UnknownAction, ThunkDispatch} from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppDispatch, unknown, UnknownAction>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
