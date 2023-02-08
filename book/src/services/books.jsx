import axiosConfig from '../axiosConfig/axiosConfig'
// ?page=${page || 0}&limit=${limit}}` +`&category=${category}
// page,limit,category,priceCode
export const getAllBooksLimit = (query) => new Promise(async (resolve,reject) => {
    
    try{
        const response = await axiosConfig({
            method:"get",
            url:`/api/books/`,
            params:query
        })
        // console.log(response)
        resolve(response)
    }catch(error){
        reject(error)
    }
})
export const getAllBooks = (query) => new Promise(async (resolve,reject) => {
    
    try{
        const response = await axiosConfig({
            method:"get",
            url:`/api/books/all`,
            params:query
        })
        // console.log(response)
        resolve(response)
    }catch(error){
        reject(error)
    }
})
export const searchBooks = (name) => new Promise(async (resolve,reject) => {
    
    try{
        const response = await axiosConfig({
            method:"get",
            url:`/api/books/all`,
            params:name
        })
        // console.log(response)
        resolve(response)
    }catch(error){
        reject(error)
    }
})