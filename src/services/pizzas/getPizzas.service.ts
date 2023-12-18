import { AppDataSource } from "../../data-source";
import { Pizza } from "../../entities/pizza.entity";

const GetPizzasService = async () => {
  const pizzaRepository = AppDataSource.getRepository(Pizza);
  const pizzas = await pizzaRepository.find({relations: ['ingredients']});
  return pizzas;
};

export default GetPizzasService;
