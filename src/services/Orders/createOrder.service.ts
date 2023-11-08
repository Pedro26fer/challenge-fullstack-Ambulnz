import { AppDataSource } from "../../data-source"
import { Pedido } from "../../entities/pedido.entity"
import { Order } from "../../interfaces/Order/order.interface"


const CreateOrderService = async () : Promise<Order> => {
    const orderRepository = AppDataSource.getRepository(Pedido)

    const order =  orderRepository.create()
    await orderRepository.save(order)

    return order
}

export default CreateOrderService