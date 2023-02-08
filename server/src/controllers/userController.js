import { BadRequest, internalServerError } from "../../middlewares/handleErrors.js";
import { getOneUser } from "../services/user.js";

export const getCurrentUser = async (req, res) => {
    try {
     //  console.log(req.email)
        const {id} = req.user   //nhận dc từ middleware verify khi gán req
       
        const response = await getOneUser(id);
       return res.status(200).json(response);
     
  
    
   } catch (error) {
    console.log(error)
     return internalServerError(res)
   }
  };

  
// export const getCurrentUser = async (req, res) => {
//     try {
//      //  console.log(req.email)
//      const {error} = Joi.object({email,password}).validate(req.body)
//       if(error) return BadRequest(error.details[0].message,res)
//        const response = await loginUser(req.body);
//        return res.status(200).json(response);
     
  
    
//    } catch (error) {
//      return internalServerError(res)
//    }
//   };