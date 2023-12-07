// import { DataSource } from "typeorm";
// import { AppDataSource } from "../../../data-source";
// import { Order } from "../../../entities/order.entity";
// import RetrivingEspecificService from "../../../services/Orders/retrivingEspecificOrder.service";
// import { Pizza } from "../../../entities/pizza.entity";
// import { Item } from "../../../interfaces/Item/item.interface";
// import { Buys } from "../../../entities/buys.entity";

// describe("Get an specific order", () => {
//     let connection: DataSource

//     beforeAll(async () => {
//         await AppDataSource.initialize()
//         .then((res) => connection = res)
//         .catch((error) => {
//             console.error("Error during Data Source initialization", error)
//         })
//     })

//     afterAll(async () => {
//         await connection.destroy()
//     })

//     test("Should retrieving an order", async () => {
//         const orderRepository = AppDataSource.getRepository(Order)
//         const order = await orderRepository.save({})
//         const {id} = order

//         const pizzaRepository = AppDataSource.getRepository(Pizza)
//         const pizza = pizzaRepository.create({
//             name: "Calabresa",
//             price: "R$ 20,00"
//         })
//         await pizzaRepository.save(pizza)

//         const data : Item = {
//             pizza: "Calabresa",
//             quantity: 1
//         } 

//         const buysRepository = AppDataSource.getRepository(Buys)
//         const buys = {
//             order : order,
//             pizza : pizza,
//             quantity : 1
//         }
//         const item = buysRepository.create(buys)
//         await buysRepository.save(item)


//         const orderRetrieved = await RetrivingEspecificService(id)

//         expect(orderRetrieved).toEqual(
//             {
//                 id,
//                 buys:[item]
//             }
//         )
//     })
// })