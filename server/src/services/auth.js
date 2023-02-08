import db from "../../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => bcrypt.hashSync(password, salt); // băm password

export const registerUser = ({ email, password,name }) =>
  new Promise(async (resolve, reject) => {
    try {
      // a=1
      // console.log({ email, password,name })
      const response = await db.User.findOrCreate({
        where: { email,name }, //kiem tra email ton tai chưa
        defaults: {
          // không có thì thêm
          email: email,
          password: hashPassword(password),
          name:name
        },
      });
      // console.log(response)
      const [user, created] = response;
      const jwtToken = created
        ? jwt.sign(
            { id: user.id, email: user.email, roleCode: user.role_code,name:user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          )
        : null; //nếu đăng ký thành công thì tạo jwt
      resolve({
        err: created ? 0 : 1, //nếu create === true thì status 0, thành công
        msg: created ? "đăng kí thành công" : "email đã tồn tại", //true tạo, false tìm thấy hoặc email tồn tại
        token: `bearer ${jwtToken}`, //trả về token
      });
    } catch (error) {
      console.log(error)
      reject(error);
    }
  });

export const loginUser = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      // a=1
      const response = await db.User.findOne({
        where: { email }, //kiem tra email trong db
        raw: true,
      });
      const isCheckedPass =
        response && bcrypt.compareSync(password, response.password);

      const objJWTResponse = isCheckedPass
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              name:response.name,
              roleCode: response.role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      //nếu đăng nhập thành công thì trả về jwt obj

      resolve({
        err: objJWTResponse ? 0 : 1, //nếu create === true thì status 0, thành công
        msg: objJWTResponse
          ? "đăng nhập thành công"
          : response
          ? " mk sai"
          : "email chưa dc đăng kí", //true tạo, false tìm thấy hoặc email tồn tại
        // jwtToken:jwtToken //trả về token
        token: `bearer ${objJWTResponse}`,
      });
    } catch (error) {
      reject(error);
    }
  });
