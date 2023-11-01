import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm'
import {v4 as uuid} from 'uuid'
import { ItemDoPedido } from './itemDoPedido.entity'


@Entity("pizzas")
export class Pizza{

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({nullable: false})
    name: string

    @Column({nullable: false, type: 'decimal', precision: 10, scale: 2})
    preco: number

    @OneToOne(() => ItemDoPedido, (item) => item.pizza)
    item: ItemDoPedido

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }

    get precoFormatado() : string {
        return this.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }
}