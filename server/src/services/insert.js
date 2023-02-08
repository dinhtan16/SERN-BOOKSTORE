import db from "../../models";
import data from "../../data/data.json";
import { generateCode ,getNumberFromString} from "../../helpers/fn";
import { dataPrice } from "../utils/dataPrice";
export const insertData = () =>
  new Promise(async (resolve, reject) => {
    try {
      const categories = Object.keys(data);

      categories.forEach(async (item) => {
        await db.Category.create({
          code: generateCode(item),
          value: item,
        });
      });

      const dataArr = Object.entries(data); //[['key'],[value]]

      const res = dataArr.forEach((item) => {

        item[1]?.map(async (book) => {

          let currentPrice = getNumberFromString(book.bookPrice)
          await db.Book.create({
            id: book.upc,
            title: book.bookTitle,
            price: book.bookPrice,
            available: book.available,
            imageUrl: book.imageUrl,
            description: book.bookDescription,
            category_code:generateCode(item[0]),
            priceCode:dataPrice.find(price => price.min <= currentPrice && price.max >= currentPrice)?.code
          });
        });
      });

      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
  export const createPrices = () => new Promise((resolve, reject) => {
    try {
        dataPrice.forEach(async (item, index) => {
            await db.Price.create({
                code: item.code,
                value: item.value,
                order: index + 1
            })
        })
       
        resolve('OK')
    } catch (err) {
        reject(err)
    }
})