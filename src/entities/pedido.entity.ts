import {Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm'
import { v4 as uuid} from 'uuid'
import { ItemDoPedido } from './itemDoPedido.entity'

@Entity("pedido")
export class Pedido{

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @ManyToMany(() => ItemDoPedido, (item) => item.pedido)
    @JoinTable()
    items: ItemDoPedido[]

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}