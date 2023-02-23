import Joi from "joi";
import { BadRequest, internalServerError } from "../../middlewares/handleErrors.js";
import { getOneUser, updateUser } from "../services/user.js";
import { idUser } from "../../helpers/joi_shcema.js";
export const getCurrentUser = async (req, res) => {
    try {
     //  console.log(req.email)
        const {id} = req.user   //nhận dc từ middleware verify khi gán req
       
        const response = await getOneUser(id);
       return res.status(200).json(response);
     
  
    
   } catch (error) {
     return internalServerError(res)
   }
  };

  
  export const updateUserController = async (req, res) => {
    try {
      const fileData = req.file; //single file
      // console.log(fileData)
      const { error } = Joi.object({ idUser }).validate({ idUser: req.body.id });
  
      if (error) {
        //nếu data lỗi thì ảnh vẫn dc upload nên handle nếu data lỗi thì xóa ảnh đã upload
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        return BadRequest(error.details[0].message, res);
      }
  
      const response = await updateUser(req.body, fileData);
      return res.status(200).json(response);
    } catch (error) {
      return internalServerError(res);
    }
  };