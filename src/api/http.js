import { useAuthStores } from "@/stores/auth";
import axios from "axios"


const api = axios.create({
    baseURL: 'https://blogs2.csm.linkpc.net/api/v1'
})

api.interceptors.request.use(config => {
    const auth = useAuthStores();
    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config;
})

export default api;