import { notAuth } from "./handleErrors"

export const verifyAdmin = (req,res,next) => {
    const {roleCode} = req.user //lấy dc obj user sau khi decode jwt từ hàm verifyToken

    if(roleCode !== "R1") return notAuth('Required admin',res)

    next()
}

export const verifyModeratorAdmin = (req,res,next) => {
    const {roleCode} = req.user //lấy dc obj user sau khi decode jwt từ hàm verifyToken
    // console.log(req.user)
    if(roleCode !== "R1" && roleCode !== "R2") return notAuth('Required staff or Admin',res)

    next()
}
