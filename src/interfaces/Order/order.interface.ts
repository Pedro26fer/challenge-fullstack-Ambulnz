import { ItemDoPedido } from "../../entities/itemDoPedido.entity";


export interface Order {
    id: string,
    items: ItemDoPedido[]
}