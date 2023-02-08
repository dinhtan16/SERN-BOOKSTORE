import { internalServerError } from "../../middlewares/handleErrors";
import { getAllCategory } from "../services/category";

export const getCategoryController = async (req, res) => {
    try {
      // const {page} =req.query
      // console.log(req.query.page)
     const response = await getAllCategory();
    //  console.log(req.query.cateCode)
     return res.status(200).json(response);
    
   } catch (error) {
    console.log(error)
     return internalServerError(res)
   }
 };
 