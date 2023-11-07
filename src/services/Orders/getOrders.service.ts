import { AppDataSource } from "../../data-source"
import { Pedido } from "../../entities/pedido.entity"
import { AppError } from "../../error/appError"


const GetOrdersService = async () => {
    const ordersRepository = AppDataSource.getRepository(Pedido)
    const order = ordersRepository.find()
    
    if(!order){
        throw new AppError(404,"Not found any order")
    }

    return order

}

export default GetOrdersService