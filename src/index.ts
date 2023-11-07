import express from 'express'
import { AppDataSource } from './data-source'
import { globalErrorMiddleware } from './middlewares/globalError.middleware'
import { pizzaRoutes } from './routes/pizzas/pizzaRoute.routes'
import { ordersRoute } from './routes/order/orderRoute.routes'

AppDataSource.initialize()
    .then(() => {
        const app = express()

        app.use(express.json())

        app.use(globalErrorMiddleware)

        pizzaRoutes(app)
        ordersRoute(app)
        
        return app.listen(process.env.PORT || 3000)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })