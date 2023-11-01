import { Express } from "express"
import GetPizzasController from "../../controllers/pizzas/getPizzas.controller"
import RegisterPizzaController from "../../controllers/pizzas/registerPizza.controller"
import DeletePizzasController from "../../controllers/pizzas/deletePizzas.controller"
import UpdatePizzaController from "../../controllers/pizzas/updatePizzas.controller"
export const pizzaRoutes = (app: Express) => {
    app.get("/pizzas", GetPizzasController)
    app.post("/pizzas", RegisterPizzaController)
    app.delete("/pizzas/:id", DeletePizzasController)
    app.put("/pizzas/:id", UpdatePizzaController)
}