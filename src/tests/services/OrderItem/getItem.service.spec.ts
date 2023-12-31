import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import GetItemService from "../../../services/OrderItem/getItem.service";
import { Order } from "../../../entities/order.entity";
import { Pizza } from "../../../entities/pizza.entity";
import { Item } from "../../../interfaces/Item/item.interface";
import { Buys } from "../../../entities/buys.entity";

describe("Get order items",() => {
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


    test("Should return order items", async () => {

        const orderRepository = AppDataSource.getRepository(Order)
        const order = orderRepository.create()
        await orderRepository.save(order)

        const pizzaRepository = AppDataSource.getRepository(Pizza)
        const pizza = pizzaRepository.create({
            name: "Calabresa",
            price: "R$ 20,00"
        })
        await pizzaRepository.save(pizza)

        const buyRepository = AppDataSource.getRepository(Buys)
        let items = buyRepository.create()
        items.order = order
        items.pizza = pizza
        items.quantity = 1
        await buyRepository.save(items)

        const itemsGetted = await GetItemService()

        expect(itemsGetted).toHaveProperty('map')
        expect(itemsGetted[0].pizza).toStrictEqual(pizza)
        expect(itemsGetted[0].quantity).toStrictEqual(1)
        expect(itemsGetted[0].id).toBeDefined
    })
})