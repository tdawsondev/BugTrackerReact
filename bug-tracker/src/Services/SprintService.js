const SprintService = {
    getTree: async function(id) {
        const res = await fetch(`https://localhost:44318/api/Sprint/GetSprintTree/${id}`)
        const data = await res.json()
        console.log(data);
        return data
    },

    secondValidationMethod: function(value) {
        
    }
};

export default SprintService;