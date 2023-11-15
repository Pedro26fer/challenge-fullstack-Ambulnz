import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import CreateOrderService from "../../../services/Orders/createOrder.service";


describe("Create an Order instance in database", () => {
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

    test("Should create an order", async () => {
        const order = await CreateOrderService()
        expect(order.id).toBeDefined
    })
})