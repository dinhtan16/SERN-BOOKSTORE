import db from "../../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => bcrypt.hashSync(password, salt); // băm password

export const registerUser = ({ email, password, name,phone,address }) =>
  new Promise(async (resolve, reject) => {
    try {
      // a=1
      // console.log({ email, password,name })
      const response = await db.User.findOrCreate({
        where: { email }, //kiem tra email ton tai chưa
        defaults: {
          // không có thì thêm
          email: email,
          password: hashPassword(password),
          name: name,
          avatar:'https://res.cloudinary.com/dejlcrm16/image/upload/v1676033454/sample.jpg',
          phone:phone,
          address:address
        },
      });
      // console.log(response)
      const [user, created] = response;
      const jwtToken = created
        ? jwt.sign(
            {
              id: user.id,
              email: user.email,
              roleCode: user.role_code,
              name: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          )
        : null; //nếu đăng ký thành công thì tạo jwt

      // TODO:refresh token
      const refreshToken = created
        ? jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: "2d",
          })
        : null;

      resolve({
        err: created ? 0 : 1, //nếu create === true thì status 0, thành công
        msg: created ? "đăng kí thành công" : "email đã tồn tại", //true tạo, false tìm thấy hoặc email tồn tại
        accessToken: jwtToken ? `bearer ${jwtToken}` : jwtToken, //trả về token
        refreshToken: refreshToken ? `${refreshToken}` : refreshToken,
      });

      if (refreshToken) {
        await db.User.update(
          {
            refresh_token: refreshToken,
          },
          {
            where: {
              id: user.id,
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
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
              name: response.name,
              roleCode: response.role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          )
        : null;
      const refreshToken = isCheckedPass // neu pass dung moi tao refresh
        ? jwt.sign({ id: response.id }, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: "2d",
          })
        : null;
      resolve({
        err: objJWTResponse ? 0 : 1, //nếu create === true thì status 0, thành công
        msg: objJWTResponse
          ? "đăng nhập thành công"
          : response
          ? " mk sai"
          : "email chưa dc đăng kí", //true tạo, false tìm thấy hoặc email tồn tại
        // jwtToken:jwtToken //trả về token
        accessToken: objJWTResponse
          ? `bearer ${objJWTResponse}`
          : objJWTResponse,
        refreshToken: refreshToken ? `${refreshToken}` : refreshToken,
      });
      if (refreshToken) {
        await db.User.update(
          {
            refresh_token: refreshToken,
          },
          {
            where: {
              id: response.id,
            },
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });

export const refreshAccessToken = (refresh_token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { refresh_token : refresh_token },
      });
      if (response) {
        jwt.verify(
          refresh_token,
          process.env.JWT_REFRESH_TOKEN,
          (err) => {
            if(err) {
              resolve({
                err: 1,
                msg: "Refresh token expired. Required Login!",
              });
            }else {
              const accessTokenNew = jwt.sign(
                {
                  id: response.id,
                  email: response.email,
                  name: response.name,
                  roleCode: response.role_code,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              resolve({
                err: accessTokenNew ? 0 : 1,
                msg: accessTokenNew ? "OK" : "Error, please try again",
                'accessToken': accessTokenNew
                  ? `bearer ${accessTokenNew}`
                  : null,
                'refresh_token': refresh_token,
              });
            }
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
