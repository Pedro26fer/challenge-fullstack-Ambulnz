import RegisterPizzaService from "../../../services/Pizzas/registerPizza.service"
import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"


describe("Create a Pizza", () => {
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

    test("Should create a new Pizza on the list in database", async () => {
        const name = "Lombinho"
        const price = 30

        const pizzaData = {name, price}

        const newPizza = await RegisterPizzaService(pizzaData)

        expect(newPizza).toEqual(
            expect.objectContaining({
                name,
                price: price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
            })
        )
        expect(newPizza.id).toBeDefined()
    })
    
})