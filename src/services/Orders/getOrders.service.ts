import { AppDataSource } from "../../data-source"
import { Pedido } from "../../entities/pedido.entity"
import { AppError } from "../../error/appError"
import { Order } from "../../interfaces/Order/order.interface"


const GetOrdersService = async () : Promise<Order[]> => {
    const ordersRepository = AppDataSource.getRepository(Pedido)
    const order = ordersRepository.find({relations:['items', 'items.pizza']})
    
    if(!order){
        throw new AppError(404,"Not found any order")
    }

    return order

}

export default GetOrdersService