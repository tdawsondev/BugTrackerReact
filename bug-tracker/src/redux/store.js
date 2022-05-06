import { configureStore } from "@reduxjs/toolkit";
import  projectReducer from "./project";

export default configureStore({
    reducer: {
        project: projectReducer,
    }
});