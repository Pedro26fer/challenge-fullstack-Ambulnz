import {Express} from "express"
import CreateItemController from "../../controllers/Item/createItem.controller"
import DeleteItemController from "../../controllers/Item/deleteItem.controller"
import UpdateItemController from "../../controllers/Item/updateItem.controller"
import GetItemsController from "../../controllers/Item/getItems.constroller"

export const itemRoute = (app: Express) => {

    app.post('/item/:id', CreateItemController)
    app.delete('/item/:id', DeleteItemController)
    app.patch('/item/:id', UpdateItemController)
    app.get('/item', GetItemsController)
}