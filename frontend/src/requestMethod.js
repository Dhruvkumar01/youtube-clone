import axios from 'axios'

axios.defaults.withCredentials = true;

export const userRequest= axios.create({
    baseURL: 'http://localhost:5000/api/'
});
