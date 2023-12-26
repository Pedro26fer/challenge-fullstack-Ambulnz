import { AppDataSource } from "../../data-source";
import { Buys } from "../../entities/buys.entity";
import { Pizza } from "../../entities/pizza.entity";
import { AppError } from "../../error/appError";
import { ItemToUpdate } from "../../interfaces/Item/item.interface";

const UpdateItemService = async (id: string, data: ItemToUpdate) => {
  const itemRepository = AppDataSource.getRepository(Buys);
  const pizzaRepository = AppDataSource.getRepository(Pizza);
  const itemToUpdate = await itemRepository.findOne({ where: { id } });

  if (!itemToUpdate) {
    throw new AppError(404, "Item not in order");
  }

  if(data.pizza){
    const newPizzaAtOrderUpdate = await pizzaRepository.findOne({where:{name:data.pizza}})
    if(!newPizzaAtOrderUpdate){
      throw new AppError(404,"Pizza not found")
    }
    data.pizza = newPizzaAtOrderUpdate
  }

  await itemRepository.update(itemToUpdate.id, data);

  return true;
};

export default UpdateItemService;
