import { Pizza } from "../../entities/pizza.entity"
import { Order } from "../Order/order.interface"

export interface Item {
    quantity: number
    pizza: string
}