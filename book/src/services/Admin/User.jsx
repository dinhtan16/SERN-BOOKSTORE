import axiosConfig from '../../axiosConfig/axiosConfig'

export const getAllUsersService = () => new Promise (async (resolve,reject) => {
    try{
        const res = await axiosConfig({
            method:'get',
            url:'/user/all',
        })
        resolve(res)
    }catch(error){
        reject(error)
    }
})

export const deleteUserService = (id) => new Promise (async (resolve,reject) => {
    try{
        const res = await axiosConfig({
            method:'delete',
            url:'/delete-user',
            params:id
        })
        resolve(res)
    }catch(error){
        reject(error)
    }
})
export const getOneUserService = (id) => new Promise (async (resolve,reject) => {
    try{
        const res = await axiosConfig({
            method:'post',
            url:'/get-user',
            data:id
        })
        resolve(res)
    }catch(error){
        reject(error)
    }
})