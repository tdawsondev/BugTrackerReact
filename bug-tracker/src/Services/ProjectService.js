const ProjectService = {
    getProjectsForUser: async function(id) {
        const res = await fetch(`https://localhost:44318/api/Login/GetActiveProjects/${id}`)
        const data = await res.json()
        return data
    },
    getProjectWithUsers: async function(id) {
        const res = await fetch(`https://localhost:44318/api/Project/GetProjectWithUsers/${id}`)
        const data = await res.json()
        return data
    },

};

export default ProjectService;