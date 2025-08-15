import axios from 'axios';



const token = localStorage.getItem("token");
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers:{
        "Authorization": `Bearer ${token || ''}`,
    }
})

export default axiosInstance;