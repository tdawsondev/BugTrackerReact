import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState: {
        project: {
            name: 'null',
            id: '0'
        }
    },
    reducers: {
        setProject: (state, action) => {
            const newProject = action.payload;
            state.project.name = newProject.name;
            state.project.id = newProject.id;
        },
        setProjectDefault: (state) =>{
            state.project.name = 'null';
            state.project.id = '0';
        }
    }

});

export const { setProject, setProjectDefault } = projectSlice.actions;

export default projectSlice.reducer