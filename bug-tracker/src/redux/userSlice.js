import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            name: 'null',
            id: '0'
        }
    },
    reducers: {
        setUser: (state, action) => {
            const newUser = action.payload;
            state.user.name = newUser.user_name;
            state.user.id = newUser.id;
        }
    }

});

export const { setUser } = userSlice.actions;

export default userSlice.reducer