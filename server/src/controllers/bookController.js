import {
  BadRequest,
  internalServerError,
} from "../../middlewares/handleErrors";
import { createBook, deleteBook, getBook, getOneBook, updateBook } from "../services/book";
const cloudinary = require("cloudinary").v2;

import {
  title,
  price,
  available,
  category_code,
  description,
  image_sId,
  id,
  ids,
  imageUrl,
  fileName
} from "../../helpers/joi_shcema";


import Joi from "joi";


export const getBookController = async (req, res) => {
  try {
    // const {page} =req.query
    // console.log(req.query)
    const response = await getBook(req.query);
    //  console.log(req.query.cateCode)
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getOneBookController = async (req, res) => {
  try {
    // const {page} =req.query
    // console.log(req.query)
    const response = await getOneBook(req.body);
    //  console.log(req.query.cateCode)
    return res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    return internalServerError(res);
  }
};

export const insertBookController = async (req, res) => {
  try {
    const fileData = req.file; //single file
    // console.log(fileData)
    // const { error } = Joi.object({
    //   title,
    //   price,
    //   available,
    //   category_code,
    //   description,
    // }).validate({ ...req.body, imageUrl: fileData?.path });

    // if (error) {
    //   //nếu data lỗi thì ảnh vẫn dc upload nên handle nếu data lỗi thì xóa ảnh đã upload
    //   if (fileData) cloudinary.uploader.destroy(fileData.filename);
    //   return BadRequest(error.details[0].message, res);
    // }

    const response = await createBook(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const updateBookController = async (req, res) => {
  try {
    const fileData = req.file; //single file
    // console.log(fileData)
    const { error } = Joi.object({ id }).validate({ id: req.body.id });

    if (error) {
      //nếu data lỗi thì ảnh vẫn dc upload nên handle nếu data lỗi thì xóa ảnh đã upload
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return BadRequest(error.details[0].message, res);
    }

    const response = await updateBook(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const deleteBookController = async (req, res) => {
  try {
    // console.log(fileData)
    console.log(req.query)

  

    const response = await deleteBook(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
