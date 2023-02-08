import axiosConfig from '../axiosConfig/axiosConfig'

export const getPriceFilterList = () => new Promise(async (resolve,reject) => {
    try{
        const response = await axiosConfig({
            method:"get",
            url:`/api/price-filter`
        })
        resolve(response)
    }catch(error){
        reject(error)
    }
})