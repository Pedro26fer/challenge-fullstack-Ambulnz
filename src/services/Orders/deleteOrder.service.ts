import { AppDataSource } from "../../data-source";
import { Buys } from "../../entities/buys.entity";
import { Order } from "../../entities/order.entity";
import { AppError } from "../../error/appError";

const DeleteOrderService = async (id: string) => {
  const orderRepository = AppDataSource.getRepository(Order);

  const orderToDelete = await orderRepository.findOne({ where: { id } });

  if (!orderToDelete) {
    throw new AppError(400, "Esse pedido não existe");
  }

  await orderRepository
    .createQueryBuilder()
    .delete()
    .from(Buys)
    .where("order.id = :orderId", { orderId: id })
    .execute();

  await orderRepository.delete(orderToDelete.id);

  return true;
};

export default DeleteOrderService;
