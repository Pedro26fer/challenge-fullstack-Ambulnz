import express from 'express'
import { AppDataSource } from './data-source'
import { globalErrorMiddleware } from './middlewares/globalError.middleware'
import { pizzaRoutes } from './routes/pizzas/pizzaRoute.routes'
import { ordersRoute } from './routes/order/orderRoute.routes'
import { itemRoute } from './routes/item/item.routes'


const app = express()

app.use(express.json())

app.use(globalErrorMiddleware)

pizzaRoutes(app)
ordersRoute(app)
itemRoute(app)

export default app
