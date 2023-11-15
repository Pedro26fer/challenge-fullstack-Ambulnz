import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import DeleteOrderService from "../../../services/Orders/deleteOrder.service";
import { Order } from "../../../entities/order.entity";


describe("Delete an order", () => {
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

    test("Should delete an order instance", async () => {
        const orderRepository = AppDataSource.getRepository(Order)
        const newOrder = orderRepository.create({})
        await orderRepository.save(newOrder)
        const {id} = newOrder
        await DeleteOrderService(id)
        const deletedOrder = await orderRepository.findOne({where: {id}})
        expect(deletedOrder).toBeNull()

    })
})