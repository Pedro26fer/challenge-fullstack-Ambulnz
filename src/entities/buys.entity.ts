import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Pizza } from "./pizza.entity";
import { Order } from "./order.entity";

@Entity("buy")
export class Buys {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: 1 })
  quantity: number;

  @OneToOne(() => Pizza, {onDelete: 'CASCADE'})
  @JoinColumn()
  pizza: Pizza;

  @ManyToOne(() => Order, (order) => order.buys)
  order: Order;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
