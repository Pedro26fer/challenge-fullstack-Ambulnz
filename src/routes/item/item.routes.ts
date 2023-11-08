import {Express} from "express"
import CreateItemController from "../../controllers/Item/createItem.controller"
import DeleteItemController from "../../controllers/Item/deleteItem.controller"

export const itemRoute = (app: Express) => {

    app.post('/item/:id', CreateItemController)
    app.delete('/item/:id', DeleteItemController)
}