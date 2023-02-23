import axiosConfig from '../axiosConfig/axiosConfig'

export const getCurrentUser = () => new Promise(async (resolve,reject) => {
    try{
        const response = await axiosConfig({
            method:"get",
            url:`/api/user`
        })
        resolve(response)
    }catch(error){
        reject(error)
    }
})

export const updateUserService = (payload) => new Promise(async (resolve,reject) => {
    try{
        const response = await axiosConfig({
            method:"put",
            url:`/api/update-user`,
            data:payload
        })
        resolve(response)
    }catch(error){
        console.log(error)
        reject(error)
    }
})