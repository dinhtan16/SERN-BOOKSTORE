import { createPrices, insertData } from "../services/insert";

export const insertController = async (req, res) => {
    try {

     const response = await insertData();
     
     return res.status(200).json(response);
    
   } catch (error) {
     return internalServerError(res)
   }
 };
 export const insertPriceController = async (req, res) => {
  try {

   const response = await createPrices();
   
   return res.status(200).json(response);
  
 } catch (error) {
   return internalServerError(res)
 }
};
