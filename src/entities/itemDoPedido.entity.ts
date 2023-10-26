import {Entity, PrimaryGeneratedColumn, OneToOne, Column, ManyToMany} from 'typeorm'
import { v4 as uuid} from 'uuid'
import { Pizza } from './pizza.entity'
import { Pedido } from './pedido.entity'


@Entity("item do pedido")
export class ItemDoPedido{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({default: 1})
    quantidade: number

    @OneToOne(() => Pizza, (pizza) => pizza.item)
    pizza: Pizza

    @ManyToMany(() => Pedido, (pedido) => pedido.items)
    pedido: Pedido[]


    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
