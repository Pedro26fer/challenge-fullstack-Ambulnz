import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { Ingredients } from "./ingredients.entity";

@Entity("pizzas")
export class Pizza {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: string;

  @ManyToMany(() => Ingredients, ingredient => ingredient.pizzas)
  @JoinTable()
  ingredients: Ingredients[]

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
