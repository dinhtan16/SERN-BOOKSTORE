import { Op } from "sequelize";
import db from "../../models";
import { v4 } from 'uuid';
import { generateCode, getNumberFromString } from "../../helpers/fn";
import { dataPrice } from "../utils/dataPrice";
export const getBook = ({page,limit,order,name,available,category,price,priceCode,...query}) =>
new Promise(async (resolve, reject) => {
    try {
        const queries = {raw:true,nest:true}
        const offsetStep = (!page || +page <=1 ) ? 0 : (+page -1)
        const limitBookPerPage = +limit || +process.env.LIMIT_BOOK
        queries.offset = offsetStep * limitBookPerPage
        queries.limit =limitBookPerPage

        if(order) queries.order = [["price",order]]
        if(name) query.title={[Op.substring]:name}
        if(available) query.available={[Op.between]:available}
        if(price) query.price={[Op.between]:price} 
        // console.log(priceCode)
        if(priceCode) query.priceCode={[Op.between]:[priceCode,priceCode]} 
        // if(greaterPrice) query.price={[Op.gt]:price}

        if(category) query.category_code={[Op.like]:category}

// ["id","title","price","available","imageUrl"]
      const response = await db.Book.findAndCountAll({
        where:query,
        attributes:["id","title","price","available","imageUrl","priceCode"],
        include:[
            {model:db.Category,as:"cateCode",attributes:["value"]}
          ],


          ...queries
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Thanh cong" : "that bai",
        bookData: response,
      });
    } catch (error) {
      reject(error);
    }
    
  });

  
  export const createBook = (body) =>
  new Promise(async (resolve, reject) => {
      try {
         
        let currentPrice = getNumberFromString(body.price)
  // ["id","title","price","available","imageUrl"]
        const response = await db.Book.findOrCreate({
          where:{title:{[Op.substring]:body.title}},
          defaults:{
            id:v4(),
            priceCode:dataPrice.find(price => price.min <= currentPrice && price.max >= currentPrice)?.code,
          
            ...body


          }
        });
        //[]
        // console.log(response)
        resolve({
          err: response[1] ? 0 : 1,
          msg: response[1] ? "tao sach Thanh cong" : " tao sach that bai",
        });
      } catch (error) {
        reject(error);
      }
      
    });
  