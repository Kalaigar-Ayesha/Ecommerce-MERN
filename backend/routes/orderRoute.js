import express from 'express'
import  {placeOrder, placeOrderStrip,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

import authUser from '../middleware/auth.js'

const orderRouter=express.Router()
//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStrip)


//user feature
orderRouter.post('/userorders',authUser,userOrders)
//verify payments
orderRouter.post('/verifyStripe',authUser,verifyStripe)
export default orderRouter