import { Express } from "express"
import CreateOrderController from "../../controllers/Orders/createOrder.controller"
import GetOrdersController from "../../controllers/Orders/getOrder.controller"
import RetrivingEspecificController from "../../controllers/Orders/retrievingSpecificOrder.controller"
import DeleteOrderController from "../../controllers/Orders/deleteOrder.controller"

export const ordersRoute = (app: Express) => {

    app.post('/order', CreateOrderController)
    app.get('/orders', GetOrdersController)
    app.get('/orders/:id', RetrivingEspecificController)
    app.delete('/orders/:id', DeleteOrderController)
} 