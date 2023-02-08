import axiosConfig from '../axiosConfig/axiosConfig'


export const registerAuth = (payload) => new Promise (async (resolve,reject) => {

    try{
        const res = await axiosConfig({
            method:'post',
            url:'/api/register',
            data:payload
        })
        console.log(payload)
        resolve(res)
    }catch(error){
        reject(error)
    }
})
