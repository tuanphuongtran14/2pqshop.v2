import axios from 'axios'

export default function callApi(endpoint,method='GET',body, config){
    return axios({
        method: method,
        url: endpoint,
        baseURL: "http://localhost:8081/",
        data: body,
        ...config      
    })
}