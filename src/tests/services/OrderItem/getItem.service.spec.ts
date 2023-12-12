import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import GetItemService from "../../../services/OrderItem/getItem.service";

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

        
    })
})