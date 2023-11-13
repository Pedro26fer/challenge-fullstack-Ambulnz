import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import RegisterPizzaService from "../../../services/Pizzas/registerPizza.service";
import DeletePizzaService from "../../../services/Pizzas/deletePizzas.service";
import GetPizzasService from "../../../services/Pizzas/getPizzas.service";


describe("Delete Pizzas test", () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((error) => {
            console.error("Error during Data Source initialization", error)
        })
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("Should delete an instance of pizza in database", async () => {
        const name = "Calabresa"
        const price = 20

        const pizzaToDeleteData = {name, price}
        const pizzaToDelete = await RegisterPizzaService(pizzaToDeleteData)
        const {id} = pizzaToDelete
        await DeletePizzaService(id)
        const updatedList = await GetPizzasService()
        const deletedPizza = updatedList.find( pizza => pizza.id === id )

        expect(deletedPizza).toBeUndefined()
    })
})