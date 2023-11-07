import { Express } from "express"
import CreateOrderController from "../../controllers/Orders/createOrders.controller"
import GetOrdersController from "../../controllers/Orders/getOrders.controller"

export const ordersRoute = (app: Express) => {

    app.post('/order', CreateOrderController)
    app.get('/orders', GetOrdersController)
} 