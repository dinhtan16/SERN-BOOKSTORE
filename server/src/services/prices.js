import db from "../../models";

export const getAllPrices= () =>
  new Promise(async (resolve, reject) => {
    try {
    

      const response = await db.Price.findAll();
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Thanh cong" : "that bai",
        priceFilterList: response,
      });
    } catch (error) {
      reject(error);
    }
  });
