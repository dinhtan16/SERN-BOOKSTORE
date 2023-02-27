import joi from 'joi'

export const email =  joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','vn','blog','org'] } }).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required()
export const name = joi.string().required().min(6)  
export const phone = joi.number().required()
export const address = joi.string().required()
export const idUser = joi.required();



export const title = joi.string().required()
export const price = joi.number().required()
export const available = joi.number().required()
export const category_code = joi.string().uppercase().alphanum().required()
export const imageUrl = joi.string().required()
export const image_sId = joi.string().required()
export const description = joi.string().required()

export const id = joi.string().required() //book id / update


export const ids = joi.array().required() // array ids chứa id cần xóa  



export const fileName = joi.array().required()


export const refreshToken = joi.string().min(3).max(200).required();