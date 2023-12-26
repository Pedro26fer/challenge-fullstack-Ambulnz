import RegisterPizzaService from "../../../services/Pizzas/registerPizza.service"
import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import { Ingredients } from "../../../entities/ingredients.entity"
import { AppError } from "../../../error/appError"



describe("Create Pizzas test", () => {
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

        const ingredientRepository = AppDataSource.getRepository(Ingredients)

        const name = "Lombinho"
        const price = 30
        const ingredients = ["Tomate"]

        const pizzaData = {name, price, ingredients}

        const newPizza = await RegisterPizzaService(pizzaData)

        const ingredient = await ingredientRepository.findOne({where:{name:ingredients[0]}})
        if(!ingredient){
            throw new AppError(404, "Ingredient not found")
        }
        expect(newPizza).toEqual(
            expect.objectContaining({
                name,
                price: price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                ingredients:[ingredient]
            })
        )
        expect(newPizza.id).toBeDefined()
    })

    
})