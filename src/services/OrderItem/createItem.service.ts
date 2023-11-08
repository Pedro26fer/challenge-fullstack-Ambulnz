import { error } from "console"
import { AppDataSource } from "../../data-source"
import { ItemDoPedido } from "../../entities/itemDoPedido.entity"
import { Pedido } from "../../entities/pedido.entity"
import { AppError } from "../../error/appError"
import { Pizza } from "../../entities/pizza.entity"
import { Item } from "../../interfaces/Item/item.interface"


const CreateItemService = async (id: string, data: Item)  => {
    const itemRepository = AppDataSource.getRepository(ItemDoPedido) 
    const orderRepository = AppDataSource.getRepository(Pedido)
    const pizzaRepository = AppDataSource.getRepository(Pizza)

    const order = await orderRepository.findOne({where: {id}})
    if(!order){
        throw new AppError(404, "No order initialization")
    }

    const pizza = await pizzaRepository.findOne({where: {
        name: data.pizza
    }})

    if(!pizza){
        throw new AppError(404, "We dont work with this kind of Pizza")
    }

    const item = await itemRepository.save({
        quantidade: data.quantity,
        pizza: pizza,
        pedido: order
    })

    return item

}

export default CreateItemService