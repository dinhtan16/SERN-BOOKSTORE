import { notAuth } from "./handleErrors"

export const verifyAdmin = (req,res,next) => {
    const {roleCode} = req.user //lấy dc obj user sau khi decode jwt từ hàm verifyToken

    if(roleCode !== "R1") return notAuth('Required admin',res)

    next()
}

