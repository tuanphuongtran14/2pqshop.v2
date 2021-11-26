import axios from 'axios'

console.log(process.env.REACT_APP_API_URL);
var axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    // `withCredentials` chỉ định có thực hiện các request cross-site Access-Control sử dụng credential hay không
    withCredentials: false, // mặc định là false,
    headers: {},
    });
    axiosClient.interceptors.request.use(async (config)=>{
        // Do something before request is sent
        // config.headers["Authorization"] = "bearer " + JSON.parse(localStorage.getItem('token'));
        config.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGUzYTcwYmVhYzEwZDRjOTAyN2VhOCIsImlhdCI6MTYzNzg0OTM2NiwiZXhwIjoxNjQwNDQxMzY2fQ.AF9vRLyN2rFrsOcm5pfP-jBOl-YgVm_h3bFsjI0J0kk" ;
        return config;
      },
      error => {
          throw error;
      })
    axiosClient.interceptors.response.use((response)=>{
        if(response && response.data){
            return response.data;
        }
        return response;
    },(error)=>{
        //handle error here
        throw error;
    })

export default axiosClient;