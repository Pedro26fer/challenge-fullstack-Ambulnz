import {Entity, PrimaryGeneratedColumn, OneToOne, Column, ManyToOne, JoinColumn} from 'typeorm'
import { v4 as uuid} from 'uuid'
import { Pizza } from './pizza.entity'
import { Pedido } from './pedido.entity'


@Entity("item_do_pedido")
export class ItemDoPedido{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({default: 1})
    quantidade: number

    @OneToOne(() => Pizza, {cascade:true})
    @JoinColumn()
    pizza: Pizza

    @ManyToOne(() => Pedido, (pedido) => pedido.items)
    pedido: Pedido


    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
