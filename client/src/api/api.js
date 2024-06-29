import axios from 'axios';

const API_KEY = process.env.REACT_APP_CLIENT_API_KEY;

const API = axios.create({
    baseURL: 'https://spotify-ranking-q7hgadoa5-oemurayes-projects.vercel.app/',
    headers: {
      'x-api-key': API_KEY,
    }
});
// const API = axios.create({
//     baseURL: 'http://localhost:4000/api',
//     headers: {
//       'x-api-key': API_KEY,
//     }
// });

API.interceptors.request.use((request) => {
        request.headers['x-api-key'] = API_KEY;
        return request;
    },
    (error) => {
        console.error('Request error', error);
        return Promise.reject(error);
    }
);
  
API.interceptors.response.use((response) => {
        return response;
    },
    (error) => {
        console.error('Response error', error);
        return Promise.reject(error);
    }
);

export default API;