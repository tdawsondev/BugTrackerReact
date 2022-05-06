import { configureStore } from "@reduxjs/toolkit";
import  projectReducer from "./project";
import userReducer from "./userSlice";

export default configureStore({
    reducer: {
        project: projectReducer,
        user: userReducer,
    }
});