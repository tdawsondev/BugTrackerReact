import baseURL from "../API";

const SprintService = {
    getTree: async function(id) {
        const res = await fetch(baseURL + `/api/Sprint/GetSprintTree/${id}`)
        const data = await res.json()
        return data
    },
    getSprintByID: async function(id){
        const res = await fetch(baseURL + `/api/Sprint/GetWithProjectData/${id}`)
        const data = await res.json()
        return data
    },
    createSprint: async function(sprint){
        const res = await fetch(baseURL + `/api/Sprint/`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sprint)
        })
        const data = await res.json()
        return data
    },
    getSprintNav: async function(id){
        const res = await fetch(baseURL + `/api/Sprint/GetNavToSprint/${id}`)
        const data = await res.json()
        return data
    },
};

export default SprintService;