import { AppDataSource } from "../../data-source"
import { Pedido } from "../../entities/pedido.entity"


const CreateOrderService = async () => {
    const orderRepository = AppDataSource.getRepository(Pedido)

    const order =  orderRepository.create()
    await orderRepository.save(order)

    return order
}

export default CreateOrderService