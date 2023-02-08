// import user from './user'
import {getCurrentUser} from '../controllers/userController.js'
import express from 'express'
import  {authControllerLogin,authControllerRegister}  from '../controllers/authController.js'
import { notFound } from '../../middlewares/handleErrors.js'
import verifyToken from '../../middlewares/verify_token.js'
import { verifyAdmin, verifyModeratorAdmin } from '../../middlewares/verify_role.js'
import { insertController, insertPriceController } from '../controllers/insertController.js'
import { getBookController, insertBookController } from '../controllers/bookController.js'
import { getCategoryController } from '../controllers/getCategory.js'
import { getPriceFilterController } from '../controllers/getPriceFilter.js'
const router = express.Router()
 const initWebRoutes = (app) => {

    //PUBLIC ROUTE
    router.post('/api/register',authControllerRegister)
    router.post('/api/login',authControllerLogin)





    router.get('/api/books',getBookController)
    router.get('/api/books/all',getBookController)

    router.get('/api/category',getCategoryController)
    router.get('/api/price-filter',getPriceFilterController)

    // router.get('/create-price',insertPriceController)
    
    //PRIVATE ROUTES // những route nằm dưới verify đều private
    // router.use(verifyToken)
    // router.use(verifyAdmin)

    router.get('/api/insert',insertController)
    router.get('/api/price',insertPriceController)

    router.post('/api/book/create',insertBookController)
    // router.use(verifyToken)
    // router.use(verifyModeratorAdmin) //verify role sau token
    router.get('/admin',[verifyToken,verifyModeratorAdmin],getCurrentUser) //cách viết middleware thứ 2


    // app.use(notFound)

    return app.use('/',router)
}

// module.exports = initWebRoutes
export default initWebRoutes