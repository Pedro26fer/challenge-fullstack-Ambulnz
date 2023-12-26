import { AppDataSource } from "../../data-source";
import { Ingredients } from "../../entities/ingredients.entity";
import { Pizza } from "../../entities/pizza.entity";
import { AppError } from "../../error/appError";
import { IPizzaToUpdated } from "../../interfaces/Pizza/pizzas.interface";

const UpdatePizzasService = async (id: string, data: IPizzaToUpdated) => {
  const pizzaRepository = AppDataSource.getRepository(Pizza);
  const ingredientsRepository = AppDataSource.getRepository(Ingredients);

  try {
    if (data.ingredients && data.ingredients.length > 0) {
      const ingredientsReady: Ingredients[] = [];

      for (const ing of data.ingredients) {
        const ingredientSaved = await ingredientsRepository.findOne({ where: { name: ing } });

        if (!ingredientSaved) {
          const newIngredient = ingredientsRepository.create({ name: ing });
          await ingredientsRepository.save(newIngredient);
          ingredientsReady.push(newIngredient);
        } else {
          ingredientsReady.push(ingredientSaved);
        }
      }

      data.ingredients = ingredientsReady;
    }

    if (data.price) {
      data.price = data.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    await pizzaRepository.update(id, data);

    return true;
  } catch (error) {
    console.error("Error during pizza update:", error);
    throw new AppError(500, "Internal Server Error");
  }
};

export default UpdatePizzasService;

