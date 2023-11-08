import { AppDataSource } from "../../data-source";
import { Pedido } from "../../entities/pedido.entity";
import { AppError } from "../../error/appError";
import { Order } from "../../interfaces/Order/order.interface";



const RetrivingEspecificService = async (id: string) : Promise<Order> => {
    
    const orderRepository = AppDataSource.getRepository(Pedido)
    const myOrder = await orderRepository.findOne({where: {id}})

    if(!myOrder){
        throw new AppError(404, "Order not found")
    }

    return myOrder
}

export default RetrivingEspecificService