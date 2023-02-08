import axiosConfig from '../axiosConfig/axiosConfig'

export const getAllCategory = () => new Promise(async (resolve,reject) => {
    try{
        const response = await axiosConfig({
            method:"get",
            url:`/api/category`
        })
        resolve(response)
    }catch(error){
        reject(error)
    }
})