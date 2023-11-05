import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm'
import {v4 as uuid} from 'uuid'
import { ItemDoPedido } from './itemDoPedido.entity'


@Entity("pizzas")
export class Pizza{

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    preco: string

    @OneToOne(() => ItemDoPedido, (item) => item.pizza)
    item: ItemDoPedido

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }

}