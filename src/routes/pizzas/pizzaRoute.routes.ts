import { Express } from "express"
import GetPizzasController from "../../controllers/Pizza/getPizzas.controller"
import RegisterPizzaController from "../../controllers/Pizza/registerPizza.controller"
import DeletePizzasController from "../../controllers/Pizza/deletePizzas.controller"
import UpdatePizzaController from "../../controllers/Pizza/updatePizzas.controller"
export const pizzaRoutes = (app: Express) => {
    app.get("/pizzas", GetPizzasController)
    app.post("/pizzas", RegisterPizzaController)
    app.delete("/pizzas/:id", DeletePizzasController)
    app.patch("/pizzas/:id", UpdatePizzaController)
}