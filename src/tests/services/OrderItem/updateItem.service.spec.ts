import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import UpdateItemService from "../../../services/OrderItem/updateItem.service";
import { Buys } from "../../../entities/buys.entity";
import { Order } from "../../../entities/order.entity";
import { Pizza } from "../../../entities/pizza.entity";
import { Item } from "../../../interfaces/Item/item.interface";

describe("testing update an instance of Item", () => {
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

    test("Should update an instance of Item", async () => {
        const orderRepository = AppDataSource.getRepository(Order)
        const order = orderRepository.create()
        await orderRepository.save(order)

        const pizzaRepository = AppDataSource.getRepository(Pizza)
        const pizza1 = pizzaRepository.create({
            name: "Calabresa",
            price: "R$ 20,00"
        })
        await pizzaRepository.save(pizza1)
        
        const pizza2 = pizzaRepository.create({
            name: "Marguerita",
            price: "R$ 20,00"
        })
        await pizzaRepository.save(pizza2)

        const buyRepository = AppDataSource.getRepository(Buys)
        let items = buyRepository.create()
        items.order = order
        items.pizza = pizza1
        items.quantity = 1
        await buyRepository.save(items)

        const dataUpdate = {
            quantity: 1,
            pizza: pizza2
        }

        await UpdateItemService(items.id, dataUpdate)

        const itemsUpdated = await buyRepository.findOne({where: {quantity:1, pizza: pizza2}})
        expect(itemsUpdated).toBeDefined
    
    })

})