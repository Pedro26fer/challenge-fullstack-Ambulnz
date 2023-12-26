import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../..";
import { IPizza } from "../../../interfaces/Pizza/pizzas.interface";
import { Pizza } from "../../../entities/pizza.entity";
import { Ingredients } from "../../../entities/ingredients.entity";
import { AppError } from "../../../error/appError";
import DeletePizzaService from "../../../services/Pizzas/deletePizzas.service";

describe("Integration test to test pizza routes and there responses", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err: Error) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create new pizza", async () => {
    const name = "Lombinho"
    const price = 30
    const ingredients = ["Tomate"]

    const pizzaData: IPizza = { name, price, ingredients }

    const response = await request(app).post("/pizzas").send(pizzaData)

    expect(response.status).toBe(201)
    expect(response.body.newPizza.name).toBe(name)
    expect(response.body.newPizza.price).toEqual(
      price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
    expect(response.body.newPizza.ingredients).toHaveProperty('map')
    expect(response.body.newPizza.id).toBeDefined;
  });


  test("Should be able to list all pizzas registered", async () => {
    const response = await request(app).get("/pizzas")

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('map')
  })

  // test("Should delete a pizza of database", async () => {
  //   const pizzaRepository = AppDataSource.getRepository(Pizza)
  //   const ingredientsRepository = AppDataSource.getRepository(Ingredients)

  //   const name = "Portuguesa"
  //   const price = 20

  //   await ingredientsRepository.save({name: "Tomate"})

  //   const tomate = await ingredientsRepository.findOne({where:{name:"Tomate"}})
  //   if(!tomate){
  //       throw new AppError(400, "Failed to create ingredient to test")
  //   }


  //   const pizzaToDelete = pizzaRepository.create({name, price: price.toLocaleString('pt-BR', {
  //       style: "currency",
  //       currency: "BRL",
  //   }), 
  //       ingredients:[tomate]
  //   })
  //   await pizzaRepository.save(pizzaToDelete)

  //   const chekingRegister = await pizzaRepository.findOne({where: {id: pizzaToDelete.id}})
  //   if(!chekingRegister){
  //     throw new AppError(400, "Error at register a pizza in testing database")
  //   }

  //   console.log(pizzaToDelete.id)

  //   const response = await request(app).delete(`/pizza/${pizzaToDelete.id}`)

  //   expect(response.status).toBe(204)

  // })
});
