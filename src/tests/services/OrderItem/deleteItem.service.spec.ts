import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import DeleteItemService from "../../../services/OrderItem/deleteItem.service";
import { Order } from "../../../entities/order.entity";
import { Pizza } from "../../../entities/pizza.entity";
import { Item } from "../../../interfaces/Item/item.interface";
import { Buys } from "../../../entities/buys.entity";

describe("Should create and delete an Item at Order created also", () => {

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


    test("Testing delete item", async () => {
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

        await DeleteItemService(items.id)

        const deletedItem = await buyRepository.findOne({where: {id: items.id}})
        
        expect(deletedItem).toBeNull()
    })
})