import db from "../../models";
import { v4 } from 'uuid';
const { Op } = require("sequelize");
export const createCart = (body) =>
  new Promise(async (resolve, reject) => {
      try {
        console.log(body)
        const response = await db.Cart.create({
            id:v4(),
            totalPrice:body.totalPrice,
            userId:body.userId,
            bookId:body.bookId,
            totalQuantity:body.totalQuantity
          
        });
        // console.log(response[0])
        resolve(response)
        console.log(response[0])
        // resolve({
        //   err: response[0] ? 0 : 1,
        //   msg: response[0] ? "tao cart Thanh cong" : " tao cart that bai",
        // });
      } catch (error) {
        reject(error);

      }
      
    });

    export const getCartUser = (body) =>
  new Promise(async (resolve, reject) => {
      try {
        const response1 = await db.Cart.findAll({
          where:{
            userId:body.userId,
          },
          attributes:['bookId'],
          
  
          });
      const idList =await response1[0].dataValues.bookId.split(',')
      const response2 = await db.Book.findAll({
        where:{
          id:idList,
        },
        attributes:['title','price','imageUrl','id'],
      });
      const  bookOrder =await response2
      const bookData = bookOrder?.map(item => item.dataValues)
      let lastResponse = []
        const response3 = await db.Cart.findAll({
            where:{
              userId:body.userId,
            },
            attributes:['id','totalPrice','bookId','createdAt','totalQuantity'],
            include:[
                // {model:db.Book,as:"bookIdData",attributes:['imageUrl','title','price']},
                {model:db.User,as:"userIdData",attributes:['name','phone','address']},
             
              ],
    
        });
        const last = await response3
        lastResponse.push(last,bookData)
        resolve(lastResponse)
        
      } catch (error) {
        console.log(error)
        reject(error);

      }
      
    });