import { AppDataSource } from "../../data-source";
import { Ingredients } from "../../entities/ingredients.entity";
import { AppError } from "../../error/appError";
import { INewIngredient } from "../../interfaces/Ingredients/ingredient.interface";

const RegisterIngredientService = async ({name} : INewIngredient ) => {
    const ingredientsRepository = AppDataSource.getRepository(Ingredients)

    const ingredientAlreadySave = await ingredientsRepository.findOne({where: {name: name}})
    if(ingredientAlreadySave){
        throw new AppError(403, "This Ingredient is already register")
    }

    const newIngredient =  ingredientsRepository.create({name})
    await ingredientsRepository.save(newIngredient)

    return newIngredient

}

export default RegisterIngredientService