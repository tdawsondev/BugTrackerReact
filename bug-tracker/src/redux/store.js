import { configureStore } from "@reduxjs/toolkit";
import  projectReducer from "./project";
import userReducer from "./userSlice";
import navReducer from "./navigation";

export default configureStore({
    reducer: {
        project: projectReducer,
        user: userReducer,
        nav: navReducer,
    }
});