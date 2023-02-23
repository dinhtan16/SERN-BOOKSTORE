import { BadRequest, internalServerError } from "../../middlewares/handleErrors.js";
import { loginUser, refreshAccessToken, registerUser } from "../services/auth.js";
import { email,password,name,refreshToken ,phone,address} from "../../helpers/joi_shcema.js";
import Joi from "joi";
 export const authControllerRegister = async (req, res) => {
   try {
    //  console.log(req.email)
    //  const { email, password } = req?.body;
    const {error} = Joi.object({email,password,name,phone,address}).validate(req.body)
    if(error) return BadRequest(error.details[0].message,res)
    // if (!email || !password) {
    //   ///check input
    //   return res.status(400).json({
    //     err: 1,
    //     msg: "missing data",
    //   });
    // }else{
      // }
    const response = await registerUser(req.body);
    
    return res.status(200).json(response);
   
  } catch (error) {
    return internalServerError(res)
  }
};


export const authControllerLogin = async (req, res) => {
  try {
   //  console.log(req.email)
   const {error} = Joi.object({email,password}).validate(req.body)
    if(error) return BadRequest(error.details[0].message,res)
     const response = await loginUser(req.body);
     return res.status(200).json(response);
   

  
 } catch (error) {
   return internalServerError(res)
 }
};


export const refreshTokenController = async (req, res) => {
  try {
   //  console.log(req.email)
   const {error} = Joi.object({refreshToken}).validate(req.body)
    if(error) return BadRequest(error.details[0].message,res)
     const response = await refreshAccessToken(req.body.refreshToken);
     return res.status(200).json(response);
   

  
 } catch (error) {
  console.log(error)
   return internalServerError(res)
 }
};