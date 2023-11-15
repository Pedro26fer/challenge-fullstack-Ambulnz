import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Order } from "../../../entities/order.entity";
import RetrivingEspecificService from "../../../services/Orders/retrivingEspecificOrder.service";

describe("Get an specific order", () => {
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

    test("Should retrieving an order", async () => {
        const orderRepository = AppDataSource.getRepository(Order)
        const order = await orderRepository.save({})
        const {id} = order
        const orderRetrieved = await RetrivingEspecificService(id)

        expect(orderRetrieved).toEqual(
            expect.objectContaining({
                id
            })
        )
    })
})