import { AppDataSource } from "../../data-source";
import { Ingredients } from "../../entities/ingredients.entity";
import { Pizza } from "../../entities/pizza.entity";
import { AppError } from "../../error/appError";
import { IPizzaToUpdated } from "../../interfaces/Pizza/pizzas.interface";

const UpdatePizzasService = async (id: string, data: IPizzaToUpdated) => {
  const pizzaRepository = AppDataSource.getRepository(Pizza);
  const ingredientsRepository = AppDataSource.getRepository(Ingredients);

  try {
    const pizzaToUpdate = await pizzaRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });

    if (!pizzaToUpdate) {
      throw new AppError(404, "Pizza not found");
    }

    let { price, ingredients } = data;

    const ingredientsReady: Ingredients[] = [];

    if (ingredients) {
      for (const ing of ingredients) {
        const ingredientSaved = await ingredientsRepository.findOne({ where: { name: ing } });

        if (!ingredientSaved) {
          console.log("entrou");
          const newIngredient = ingredientsRepository.create({ name: ing });
          await ingredientsRepository.save(newIngredient);
          ingredientsReady.push(newIngredient);
        } else {
          ingredientsReady.push(ingredientSaved);
        }
      }
    }

    if (price) {
      let formatedPrice = price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      pizzaToUpdate.price = formatedPrice;
    }

    if (ingredientsReady.length > 0) {
      pizzaToUpdate.ingredients = ingredientsReady;
    }

    console.log("chegou1");
    await pizzaRepository.save(pizzaToUpdate); 
    console.log("chegou2");

    return true;
  } catch (error) {
    console.error("Erro durante a atualização da pizza:", error);
    throw new AppError(500, "Internal Server Error");
  }
};

export default UpdatePizzasService;

