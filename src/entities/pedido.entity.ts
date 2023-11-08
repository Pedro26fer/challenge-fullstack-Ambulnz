import {Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { v4 as uuid} from 'uuid'
import { ItemDoPedido } from './itemDoPedido.entity'

@Entity("pedido")
export class Pedido{

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @OneToMany(() => ItemDoPedido, (item) => item.pedido, {cascade: true}  )
    items: ItemDoPedido[]

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}