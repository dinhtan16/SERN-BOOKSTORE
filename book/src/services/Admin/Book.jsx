import axiosConfig from '../../axiosConfig/axiosConfig'

export const createBookAdminService = (payload) => new Promise (async (resolve,reject) => {
    try{
        const res = await axiosConfig({
            method:'post',
            url:'/api/create-book',
            data:payload
        })
        resolve(res)
    }catch(error){
        reject(error)
    }
})


