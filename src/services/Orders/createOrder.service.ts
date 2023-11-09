import { AppDataSource } from "../../data-source";
import { Order } from "../../entities/order.entity";


const CreateOrderService = async (): Promise<Order> => {
  const orderRepository = AppDataSource.getRepository(Order);

  const order = orderRepository.create();
  await orderRepository.save(order);

  return order;
};

export default CreateOrderService;
