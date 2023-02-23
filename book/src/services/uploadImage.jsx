// import axiosConfig from '../axiosConfig/axiosConfig'
import axios from 'axios'

const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_CLIENT_URL,
  
  });
export const uploadImage = (form) => new Promise(async (resolve,reject) => {
    try{
        const response = await axiosConfig({
            method:"post",
            url:`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            data:form,
            // body:form
        })
        resolve(response)
    }catch(error){
        reject(error)
    }
})