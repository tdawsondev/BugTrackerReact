import baseURL from "../API";

const ProjectService = {
    getProjectsForUser: async function(id) {
        const res = await fetch(baseURL + `/api/Login/GetActiveProjects/${id}`)
        const data = await res.json()
        return data
    },
    getProjectWithUsers: async function(id) {
        const res = await fetch(baseURL + `/api/Project/GetProjectWithUsers/${id}`)
        const data = await res.json()
        return data
    },
    createProject: async function(project){
        const res = await fetch(baseURL + `/api/Project/`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        })
        const data = await res.json()
        return data
    },
    getSprints: async function(id) {
        const res = await fetch(baseURL + `/api/Project/GetSprints/${id}`)
        const data = await res.json()
        return data
    },
    getProject: async function(id){
        const res = await fetch(baseURL + `/api/Project/Get/${id}`)
        const data = await res.json()
        return data
    }

};

export default ProjectService;