import axiosConfig from '../axiosConfig/axiosConfig'

export const createCart = (payload) => new Promise(async (resolve,reject) => {
    try{
        const response = await axiosConfig({
            method:"post",
            url:`/cart-create`,
            data:payload,
           
        })
        resolve(response)
    }catch(error){
        reject(error)
    }
})