import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import GetOrdersService from "../../../services/Orders/getOrders.service";

describe("List the orders", () => {
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

    test("Should list all the orders", async () => {
        const orders = await GetOrdersService()
        expect(orders).toHaveProperty('map')
    })
})

