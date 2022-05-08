import baseURL from "../API";

const LoginService = {
    tryLogin: async function(login) {
        const res = await fetch(baseURL + '/api/Login/TryLogin', { method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(login)
        })
        const data = await res.json()
        return data
    },

};

export default LoginService;