import { AppDataSource } from "../../data-source"
import { ItemDoPedido } from "../../entities/itemDoPedido.entity"
import { AppError } from "../../error/appError"



const DeleteItemService = async (id: string) => {

    const itemRepository = AppDataSource.getRepository(ItemDoPedido)

    const itemToBeDelete = await itemRepository.findOne({where: {id}})
    if(!itemToBeDelete){
        throw new AppError(404, "Item does not exist in order")
    }

    await itemRepository.delete(id)

    return true

}

export default DeleteItemService