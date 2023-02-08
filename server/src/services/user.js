import db from "../../models";

export const getOneUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        attributes: { exclude: ["password",'role_code'] }, //kh trả về password
        include:[
          {
            model:db.Role,as:'roleData',
            attributes:['id','code','value'] //lấy data tương ứng
          }
        ] //lấy data từ khóa ngoại, bắt buộc có alias => as
    
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Thanh cong" : "tim user that bai",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
