import { internalServerError } from "../../middlewares/handleErrors";
import { createCart, getCartUser } from "../services/cart";

export const createCartController = async (req, res) => {
    try {
      // const {page} =req.query
      // console.log(req.query.page)
    //   console.log(req.body)
     const response = await createCart(req.body);
    //  console.log(req.query.cateCode)
     return res.status(200).json(response);
    
   } catch (error) {
    console.log(error)
     return internalServerError(res)
   }
 };

 
export const getCartUserController = async (req, res) => {
    try {
      // const {page} =req.query
      // console.log(req.query.page)
    //   console.log(req.body)
     const response = await getCartUser(req.body);
    //  console.log(req.query.cateCode)
     return res.status(200).json(response);
    
   } catch (error) {
    console.log(error)
     return internalServerError(res)
   }
 };
 