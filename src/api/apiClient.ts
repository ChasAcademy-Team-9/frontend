import axios from 'axios'; 

export const apiClient = axios.create({
     baseURL: 'https://team9testwebapp-h3b5c7gqgbeqhxgp.swedencentral-01.azurewebsites.net',
     headers: {
          'Content-Type': 'application/json',
     }
});