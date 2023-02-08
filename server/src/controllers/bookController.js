import { internalServerError } from "../../middlewares/handleErrors";
import { createBook, getBook } from "../services/book";

export const getBookController = async (req, res) => {
    try {
      // const {page} =req.query
      // console.log(req.query)
     const response = await getBook(req.query);
    //  console.log(req.query.cateCode)
     return res.status(200).json(response);
    
   } catch (error) {
    console.log(error)
     return internalServerError(res)
   }
 };
 
export const insertBookController = async (req, res) => {
  try {
    // const {page} =req.query
    // console.log(req.query)
   const response = await createBook(req.body);
  //  console.log(req.query.cateCode)
   return res.status(200).json(response);
  
 } catch (error) {
  console.log(error)
   return internalServerError(res)
 }
};