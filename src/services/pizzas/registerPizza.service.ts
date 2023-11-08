import { AppDataSource } from "../../data-source";
import { Pizza } from "../../entities/pizza.entity";
import { AppError } from "../../error/appError";
import {
  IPizza,
  IPizzaReturned,
} from "../../interfaces/Pizza/pizzas.interface";

const RegisterPizzaService = async ({
  name,
  preco,
}: IPizza): Promise<IPizzaReturned> => {
  const pizzaRepository = AppDataSource.getRepository(Pizza);

  const nameAlreadyRegister = await pizzaRepository.findOne({
    where: { name },
  });

  if (nameAlreadyRegister) {
    throw new AppError(403, "Pizza already register");
  }

  const precoFormatado = preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const newPizza = await pizzaRepository.save({
    name,
    preco: precoFormatado,
  });

  return newPizza;
};

export default RegisterPizzaService;
