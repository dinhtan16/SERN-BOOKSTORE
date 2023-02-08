import { internalServerError } from "../../middlewares/handleErrors";
import { getAllPrices } from "../services/prices";

export const getPriceFilterController = async (req, res) => {
    try {
      // const {page} =req.query
      // console.log(req.query.page)
     const response = await getAllPrices();
    //  console.log(req.query.cateCode)
     return res.status(200).json(response);
    
   } catch (error) {
    console.log(error)
     return internalServerError(res)
   }
 };
 