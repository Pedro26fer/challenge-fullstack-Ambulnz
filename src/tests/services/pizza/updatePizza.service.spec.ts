import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import UpdatePizzasService from "../../../services/Pizzas/updatePizzas.service";
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

        const pizzaRepository = AppDataSource.getRepository(Pizza)

        const name = "Portuguesa"
        const price = 20


        const pizzaToUpdate = pizzaRepository.create({name: name, price: price.toLocaleString('pt-BR', {
            style: "currency",
            currency: "BRL"
        })})
        await pizzaRepository.save(pizzaToUpdate)

        const {id} = pizzaToUpdate

        const dataRequestUpdate = {"name":"A Moda", "price": "R$ 25,00"}

        await UpdatePizzasService(id, dataRequestUpdate)        

        const pizzaUpdated = await pizzaRepository.findOne({where: {
            name: "A Moda",
            price: "R$ 25,00"
        }})

        expect(pizzaUpdated).toBeDefined()
        expect(pizzaUpdated?.name).toBe("A Moda")
        expect(pizzaUpdated?.price).toBe("R$ 25,00")
    })
})