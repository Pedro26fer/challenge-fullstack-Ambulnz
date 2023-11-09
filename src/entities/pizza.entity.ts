import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("pizzas")
export class Pizza {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
