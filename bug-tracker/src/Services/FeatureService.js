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
    }
};

export default FeatureService;