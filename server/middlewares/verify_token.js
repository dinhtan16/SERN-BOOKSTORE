import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { notAuth } from './handleErrors'


const verifyToken =(req,res,next) => {
    // console.log(req.headers)
    const token = req.headers.authorization

    if(!token) return notAuth('missing token !',res)

    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken,process.env.JWT_SECRET,(err,user) => {
        if(err){
            const isExpired = err instanceof TokenExpiredError

            if(!isExpired) return notAuth('Token is invalid',res,isExpired)
           
            if(isExpired) return notAuth('Token is expired!',res,isExpired)
        }

        
        //gán một user cho req để controller nhận được !
        
        req.user = user   //decode từ jwt sang obj user , đổi decode thành user cho dễ nhận biết
        next() // chạy qua controller
    })
}

export default verifyToken