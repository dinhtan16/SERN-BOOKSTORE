// import user from './user'
import {deleteUserController, getAllUserAdminRoleController, getCurrentUser, getOneUserAdminRoleController, updateUserController} from '../controllers/userController.js'
import express from 'express'
import  {authControllerLogin,authControllerRegister, refreshTokenController}  from '../controllers/authController.js'
import { notFound } from '../../middlewares/handleErrors.js'
import verifyToken from '../../middlewares/verify_token.js'
import { verifyAdmin, verifyModeratorAdmin } from '../../middlewares/verify_role.js'
import { insertController, insertPriceController } from '../controllers/insertController.js'
import { deleteBookController, getBookController, getOneBookController, insertBookController, updateBookController } from '../controllers/bookController.js'
import { getCategoryController } from '../controllers/getCategory.js'
import { getPriceFilterController } from '../controllers/getPriceFilter.js'


import uploadCloud from '../../middlewares/uploadCloud.js'
import { adminCheckController } from '../controllers/adminCheckController.js'
import { createCartController, getCartUserController } from '../controllers/cartController.js'

const router = express.Router()
 const initWebRoutes = (app) => {

    //PUBLIC ROUTE
    router.post('/api/register',authControllerRegister)
    router.post('/api/login',authControllerLogin)


    router.get('/api/books',getBookController)
    router.get('/api/books/all',getBookController)

    //get one book
    router.post('/one-book',getOneBookController)



    
    router.get('/api/category',getCategoryController)
    router.get('/api/price-filter',getPriceFilterController)

    // router.get('/create-price',insertPriceController)
    router.post('/api/refresh',refreshTokenController)
    
    //CART
    router.post('/cart-create',[verifyToken],createCartController)
    router.get('/my-cart',[verifyToken],getCartUserController)

    
    // router.get('/api/insert',insertController)
    // router.get('/api/price',insertPriceController)


    //PRIVATE ROUTES // những route nằm dưới verify đều private
    // router.use(verifyToken)
    // router.use(verifyAdmin)
    router.get('/api/user',[verifyToken],getCurrentUser)
    router.put('/api/update-user',[verifyToken],uploadCloud.single('avatar'),updateUserController)





    // router.use(verifyToken)
    // router.use(verifyModeratorAdmin) //verify role sau token
    router.get('/admin',[verifyToken,verifyAdmin],adminCheckController) //cách viết middleware thứ 2
    router.get('/user/all',[verifyToken,verifyAdmin],getAllUserAdminRoleController)
    router.delete('/delete-user',[verifyToken,verifyAdmin],deleteUserController)
    router.post('/get-user',[verifyToken,verifyAdmin],getOneUserAdminRoleController)



    router.post('/api/create-book',[verifyToken,verifyAdmin],insertBookController)
    router.put('/api/book/update',[verifyToken,verifyAdmin],updateBookController)
    router.delete('/api/book/delete',[verifyToken,verifyAdmin],deleteBookController)

    // app.use(notFound)

    return app.use('/',router)
}

// module.exports = initWebRoutes
export default initWebRoutes