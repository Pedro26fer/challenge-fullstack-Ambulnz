import { AppDataSource } from "../../data-source"
import { ItemDoPedido } from "../../entities/itemDoPedido.entity"
import { Pedido } from "../../entities/pedido.entity"
import { AppError } from "../../error/appError"


const DeleteOrderService = async (id: string) => {

    const orderRepository = AppDataSource.getRepository(Pedido)

    const orderToDelete = await orderRepository.findOne({where: {id}})

    if(!orderToDelete){
        throw new AppError(400, "Esse pedido não existe")
    }

    await orderRepository.createQueryBuilder()
    .delete()
    .from(ItemDoPedido)
    .where('pedido.id = :pedidoId', { pedidoId: id })
    .execute();

    await orderRepository.delete(orderToDelete.id)

    return true
}

export default DeleteOrderService