import baseURL from "../API";

const FeatureService = {
    createFeature: async function(feature){
        const res = await fetch(baseURL + `/api/Feature/`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feature)
        })
        const data = await res.json()
        return data
    },
    getWithParents: async function(id){
        const res = await fetch(baseURL + `/api/Feature/GetWithParents/${id}`)
        const data = await res.json()
        return data
    },
    updateFeature: async function(feature){
        const res = await fetch(baseURL + `/api/Feature/`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feature)
        })
        const data = await res.json()
        return data
    }
};

export default FeatureService;