import { AppDataSource } from "../../data-source";
import { Buys } from "../../entities/buys.entity";
import { Order } from "../../entities/order.entity";
import { AppError } from "../../error/appError";
import { Pizza } from "../../entities/pizza.entity";
import { Item } from "../../interfaces/Item/item.interface";

const CreateItemService = async (id: string, data: Item) => {
  const itemRepository = AppDataSource.getRepository(Buys);
  const orderRepository = AppDataSource.getRepository(Order);
  const pizzaRepository = AppDataSource.getRepository(Pizza);

  const order = await orderRepository.findOne({ where: { id } });
  if (!order) {
    throw new AppError(404, "No order initialization");
  }

  const pizza = await pizzaRepository.findOne({
    where: {
      name: data.pizza,
    },
  });

  if (!pizza) {
    throw new AppError(404, "We dont work with this kind of Pizza");
  }

  const item = await itemRepository.save({
    quantity: data.quantity,
    pizza: pizza,
    order: order,
  });

  return item;
};

export default CreateItemService;
