import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Buys } from "./buys.entity";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @OneToMany(() => Buys, (buy) => buy.order, {onDelete: 'CASCADE'})
  buys: Buys[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
