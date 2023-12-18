import { Entity, ManyToMany, Column, PrimaryGeneratedColumn } from "typeorm";
import { Pizza } from "./pizza.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Ingredients {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({nullable: false})
    name: string

    @ManyToMany(() => Pizza, pizza => pizza.ingredients)
    pizzas: Pizza[]

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }

}
