import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import GetPizzasService from "../../../services/Pizzas/getPizzas.service";

describe("List avaible pizzas", () => {
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

    
    test("Should list all Pizzas in database", async() => {
        const listOfPizzas = await GetPizzasService()

        expect(listOfPizzas).toHaveProperty("map")
    })
})
