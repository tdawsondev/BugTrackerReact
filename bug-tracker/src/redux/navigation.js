import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
    name: "nav",
    initialState: {
        nav: {
        }
    },
    reducers: {
        setNav: (state, action) => {
            const newNav = action.payload;
            state.nav = newNav;
        },
        setNavDefault: (state) =>{
            state.nav = {};
        }
    }

});

export const { setNav, setNavDefault } = navSlice.actions;

export default navSlice.reducer