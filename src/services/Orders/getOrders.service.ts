import { AppDataSource } from "../../data-source";
import { Order } from "../../entities/order.entity";
import { AppError } from "../../error/appError";

const GetOrdersService = async (): Promise<Order[]> => {
  const ordersRepository = AppDataSource.getRepository(Order);
  const order = ordersRepository.find({ relations: ["buys", "buys.pizza"] });

  if (!order) {
    throw new AppError(404, "Not found any order");
  }

  return order;
};

export default GetOrdersService;
