import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import UpdatePizzasService from "../../../services/Pizzas/updatePizzas.service";
import { Pizza } from "../../../entities/pizza.entity";
import { AppError } from "../../../error/appError";
import { Ingredients } from "../../../entities/ingredients.entity";
import { IPizzaToUpdated } from "../../../interfaces/Pizza/pizzas.interface";

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
        const ingredientsRepository = AppDataSource.getRepository(Ingredients)

        const name = "Portuguesa"
        const price = 20

        await ingredientsRepository.save({name: "Tomate"})

        const tomate = await ingredientsRepository.findOne({where:{name:"Tomate"}})
        if(!tomate){
            throw new AppError(400, "Failed to create ingredient to test")
        }


        const pizzaToUpdate = pizzaRepository.create({name, price: price.toLocaleString('pt-BR', {
            style: "currency",
            currency: "BRL",
        }), 
            ingredients:[tomate]
        })
        await pizzaRepository.save(pizzaToUpdate)

        const {id} = pizzaToUpdate

        const newPrice = 22

        const dataRequestUpdate: IPizzaToUpdated = {name:"A Moda", price: newPrice}

        await UpdatePizzasService(id, dataRequestUpdate)        

        const pizzaUpdated = await pizzaRepository.findOne({where: {
            name: "A Moda",
            price: newPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
        }})

        expect(pizzaUpdated).toBeDefined()
        expect(pizzaUpdated?.name).toBe("A Moda")
        expect(pizzaUpdated?.price).toBe(newPrice.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }))
    })
})