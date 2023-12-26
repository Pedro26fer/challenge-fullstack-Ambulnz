import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import DeletePizzaService from "../../../services/Pizzas/deletePizzas.service";
import { Pizza } from "../../../entities/pizza.entity";


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
        const pizzaRepository = AppDataSource.getRepository(Pizza)

        const name = "Calabresa"
        const price = 20

        const pizzaToDelete = pizzaRepository.create({name: name, price: price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        })
        await pizzaRepository.save(pizzaToDelete)

        const {id} = pizzaToDelete

        await DeletePizzaService(id)
        const deletedPizza = await pizzaRepository.findOne({where: {id}})

        expect(deletedPizza).toBeNull()
    })
})