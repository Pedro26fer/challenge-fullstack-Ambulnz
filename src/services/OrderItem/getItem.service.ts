import { AppDataSource } from "../../data-source";
import { Buys } from "../../entities/buys.entity";

const GetItemService = async () => {
  const itemRepository = AppDataSource.getRepository(Buys);
  const items = await itemRepository.find({ relations: ["pizza"] });
  return items;
};

export default GetItemService;
