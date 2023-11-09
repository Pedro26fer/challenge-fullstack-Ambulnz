import { AppDataSource } from "../../data-source";
import { Order } from "../../entities/order.entity";
import { AppError } from "../../error/appError";


const RetrivingEspecificService = async (id: string): Promise<Order> => {
  const orderRepository = AppDataSource.getRepository(Order);
  const myOrder = await orderRepository.findOne({ where: { id }, relations: ['buys'] });

  if (!myOrder) {
    throw new AppError(404, "Order not found");
  }

  return myOrder;
};

export default RetrivingEspecificService;
