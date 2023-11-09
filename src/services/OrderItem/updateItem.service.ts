import { AppDataSource } from "../../data-source";
import { Buys } from "../../entities/buys.entity";
import { AppError } from "../../error/appError";
import { ItemToUpdate } from "../../interfaces/Item/item.interface";

const UpdateItemService = async (id: string, data: ItemToUpdate) => {
  const itemRepository = AppDataSource.getRepository(Buys);
  const itemToUpdate = await itemRepository.findOne({ where: { id } });

  if (!itemToUpdate) {
    throw new AppError(404, "Item not in order");
  }

  await itemRepository.update(itemToUpdate.id, data);

  return true;
};

export default UpdateItemService;
