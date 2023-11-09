import { Buys } from "../../entities/buys.entity";

export interface OrderRegister {
  id: string;
  items: Buys[];
}
