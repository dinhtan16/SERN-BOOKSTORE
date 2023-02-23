import { Op } from "sequelize";
import db from "../../models";
import { v4 } from 'uuid';
import { generateCode, getNumberFromString } from "../../helpers/fn";
import { dataPrice } from "../utils/dataPrice";

const cloudinary = require('cloudinary').v2;


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

  
  export const createBook = (body,fileData) =>
  new Promise(async (resolve, reject) => {
      try {
         
        let currentPrice = getNumberFromString(body.price)
        const response = await db.Book.findOrCreate({
          where:{title:{[Op.substring]:body?.title}},
          defaults:{
            id:v4(),
            priceCode:dataPrice.find(price => price.min <= currentPrice && price.max >= currentPrice)?.code,
            imageUrl:fileData?.path,
            fileName:fileData?.filename,
            ...body


          }
        });
        resolve({
          err: response[1] ? 0 : 1,
          msg: response[1] ? "tao sach Thanh cong" : " tao sach that bai",
        });
        if(fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)
      } catch (error) {
        reject(error);
        if(fileData) cloudinary.uploader.destroy(fileData.filename)

      }
      
    });


    export const updateBook = ({id,...body},fileData) =>
    new Promise(async (resolve, reject) => {
        try {
          // nếu sửa ảnh thì ghi đè ảnh cũ, còn không thì giữ nguyên không up => check nếu có
          //fileDaa thì ghi đè
           if(fileData) body.imageUrl = fileData?.path
           if(fileData) body.fileName = fileData?.filename
            //obj1 : cái mình muốn sửa
            //obj2 : condition
          const response = await db.Book.update(body,{
            where:{id},
          });
          console.log(response[0])
          //response update trả về số lượng sách đã update
          resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? "cap nhat Thanh cong" : " cap nhat sach that bai/ hoac Id sai",
          });
          if(fileData && response[0] === 0) cloudinary.uploader.destroy(fileData.filename)
        } catch (error) {
          reject(error);
          if(fileData) cloudinary.uploader.destroy(fileData.filename)
  
        }
        
      });
  
      export const deleteBook = (ids,fileName) =>
      new Promise(async (resolve, reject) => {
          try {
            //ids : mảng ids chứa các id cần xóa
            const response = await db.Book.destroy({
              where:{id:ids},
            });
            //response destroy trả về số lượng record đã xóa
            resolve({
              err: response > 0 ? 0 : 1,
              msg: response > 0 ? `${response} books deleted` : "xóa thất bại/ ID Sai",
            });
            if(fileName) cloudinary.api.delete_resources(fileName)
          } catch (error) {

            reject(error);
    
          }
          
        });