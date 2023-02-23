import axiosConfig from '../axiosConfig/axiosConfig'


export const registerAuth = (payload) => new Promise (async (resolve,reject) => {
    try{
        const res = await axiosConfig({
            method:'post',
            url:'/api/register',
            data:payload
        })
        resolve(res)
    }catch(error){
        reject(error)
    }
})

export const loginAuth = (payload) => new Promise (async (resolve,reject) => {

    try{
        const res = await axiosConfig({
            method:'post',
            url:'/api/login',
            data:payload
        })
        resolve(res)
    }catch(error){
        reject(error)
    }
})


