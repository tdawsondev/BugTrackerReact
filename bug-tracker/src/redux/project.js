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
            state.project.name = newProject.projectname;
            state.project.id = newProject.projectid;
        }
    }

});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer