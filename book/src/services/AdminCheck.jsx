import axiosConfig from '../axiosConfig/axiosConfig'

export const adminCheck = (payload) => new Promise (async (resolve,reject) => {
    try{
        const res = await axiosConfig({
            method:'get',
            url:'/admin',
            data:payload,
            headers:{
                Authorization: JSON.parse(localStorage.getItem('persist:auth'))?.token
            }
        })
        resolve(res)
    }catch(error){
        reject(error)
    }
})