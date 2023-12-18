import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest"
import app from "../../..";
import { IPizza } from "../../../interfaces/Pizza/pizzas.interface";


describe("Integration test to test pizza routes and there responses", () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => connection = res)
        .catch((err: Error) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("Should be able to create new pizza", async () => {
        const name = "Lombinho"
        const price = 30
        const ingredients = ["Tomate"]

        const pizzaData: IPizza = {name, price, ingredients}

        const response = await request(app).post("/pizzas").send(pizzaData)

        expect(response.status).toBe(201)
        expect(response.body.newPizza.name).toBe(name)
        expect(response.body.newPizza.price).toEqual(price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        )
        expect(response.body.newPizza.id).toBeDefined
    })

    test
})