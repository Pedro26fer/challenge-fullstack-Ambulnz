import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import RegisterPizzaService from "../../../services/Pizzas/registerPizza.service";
import UpdatePizzasService from "../../../services/Pizzas/updatePizzas.service";
import GetPizzasService from "../../../services/Pizzas/getPizzas.service";
import { Pizza } from "../../../entities/pizza.entity";

describe("Update Pizzas", () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => {
            console.error("Error during initialization Datasource", err)
        })
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("Should update an instance of pizza in database", async () => {

        const name = "Portuguesa"
        const price = 20

        const pizzaToUpdateData = {name, price}

        const pizzaToUpdate = await RegisterPizzaService(pizzaToUpdateData)

        const {id} = pizzaToUpdate

        const dataRequestUpdate = {"name":"A Moda", "price": "R$ 25,00"}

        await UpdatePizzasService(id, dataRequestUpdate)

        const listOfPizzas = await GetPizzasService()

        const pizzaUpdated = listOfPizzas.find(pizza => pizza.name === "A Moda")

        expect(pizzaUpdated).toBeDefined()
        expect(pizzaUpdated?.name).toBe("A Moda")
        expect(pizzaUpdated?.price).toBe("R$ 25,00")
    })
})