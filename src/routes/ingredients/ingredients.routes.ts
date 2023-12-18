import {Express} from "express"
import RegisterIngredientsController from "../../controllers/Ingredients/registerIngredients.controller"
import GetIngredientsController from "../../controllers/Ingredients/getIngredients.controller"
import DeleteIngredientsController from "../../controllers/Ingredients/deleteIngredients.controller"




export const ingredientsRoute = (app: Express) => {
    app.post("/ingredients", RegisterIngredientsController)
    app.get("/ingredients", GetIngredientsController)
    app.delete("/ingredients/:id", DeleteIngredientsController)
}