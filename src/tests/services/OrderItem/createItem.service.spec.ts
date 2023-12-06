import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import CreateItemService from "../../../services/OrderItem/createItem.service";
import { Order } from "../../../entities/order.entity";
import { Item } from "../../../interfaces/Item/item.interface";
import { Pizza } from "../../../entities/pizza.entity";


describe("Create an Item instance in database", () => {
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

    test("Should create an item an put in order", async () => {
        const orderRepository = AppDataSource.getRepository(Order)
        const order = orderRepository.create()
        await orderRepository.save(order)

        const pizzaRepository = AppDataSource.getRepository(Pizza)
        const pizza = pizzaRepository.create({
            name: "Calabresa",
            price: "R$ 20,00"
        })
        await pizzaRepository.save(pizza)

        const data : Item = {
            pizza: "Calabresa",
            quantity: 1
        } 

        const item = await CreateItemService(order.id, data)

        expect(item).toEqual(
            expect.objectContaining({
                pizza,
                order,
                quantity: data.quantity
            })
        )

        expect(item.id).toBeDefined
    })

  
})