import joi from 'joi'

export const email = joi.string().pattern(new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required()
export const name = joi.string().required()
