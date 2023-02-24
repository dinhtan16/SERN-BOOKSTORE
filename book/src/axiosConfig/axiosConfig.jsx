import axios from 'axios'



  const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
  
  });
// Add a request interceptor

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    //TODO: gan token vao header de goi api
      const userToken = localStorage.getItem('persist:auth') &&  JSON.parse(localStorage.getItem('persist:auth'))?.token?.slice(1,-1)
      config.headers = {
        authorization :userToken ? userToken : null
      }

    


    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    //     //TODO: refresh token

    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default instance