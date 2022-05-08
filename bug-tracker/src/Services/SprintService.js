import baseURL from "../API";

const SprintService = {
    getTree: async function(id) {
        const res = await fetch(baseURL + `/api/Sprint/GetSprintTree/${id}`)
        const data = await res.json()
        console.log(data);
        return data
    },

    secondValidationMethod: function(value) {
        
    }
};

export default SprintService;