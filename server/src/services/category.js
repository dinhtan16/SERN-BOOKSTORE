import db from "../../models";

export const getAllCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
    

      const response = await db.Category.findAll();
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Thanh cong" : "that bai",
        categoryData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
