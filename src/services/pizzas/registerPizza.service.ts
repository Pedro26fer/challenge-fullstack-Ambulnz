import { AppDataSource } from "../../data-source";
import { Ingredients } from "../../entities/ingredients.entity";
import { Pizza } from "../../entities/pizza.entity";
import { AppError } from "../../error/appError";
import {
  IPizza,
  IPizzaReturned,
} from "../../interfaces/Pizza/pizzas.interface";

const RegisterPizzaService = async ({
  name,
  price,
  ingredients
}: IPizza): Promise<IPizzaReturned> => {
  const pizzaRepository = AppDataSource.getRepository(Pizza);
  const ingredientRepository = AppDataSource.getRepository(Ingredients)

  const nameAlreadyRegister = await pizzaRepository.findOne({
    where: { name },
  });

  if (nameAlreadyRegister) {
    throw new AppError(403, "Pizza already register");
  }

  const formatedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const allIngrediennts : Ingredients[] = []
  for( let i = 0; i < ingredients.length; i++){
    const ingredientSaved = await ingredientRepository.findOne({where: {name: ingredients[i]}})

    if(!ingredientSaved){
      const newIngredient = ingredientRepository.create({
        name: ingredients[i]
      })
      await ingredientRepository.save(newIngredient)
      allIngrediennts.push(newIngredient)
    }else{
      allIngrediennts.push(ingredientSaved!)
    }

  }

  const newPizza = await pizzaRepository.save({
    name,
    price: formatedPrice,
    ingredients: allIngrediennts
  });

  return newPizza;
};

export default RegisterPizzaService;
