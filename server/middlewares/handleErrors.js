import createError from 'http-errors'



export const BadRequest = (err,res) => {
    const error = createError.BadRequest(err)

    return res.status(error.status).json({
        err:1,
        msg:error.message
    })
}

export const internalServerError = (res) => {
    const error = createError.InternalServerError()

    return res.status(error.status).json({
        err:1,
        msg:error.message
    })
}


export const notFound = (req,res) => {
    const error = createError.NotFound('this route not exist')

    return res.status(error.status).json({
        err:1,
        msg:error.message
    })
}

export const notAuth = (err,res,isExpired) => {
    const error = createError.Unauthorized(err)

    return res.status(error.status).json({
        err:isExpired ? 2 : 1,
        msg:error.message
    })
}