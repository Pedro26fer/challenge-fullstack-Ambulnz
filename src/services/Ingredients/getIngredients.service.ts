import { AppDataSource } from "../../data-source";
import { Ingredients } from "../../entities/ingredients.entity";
import { AppError } from "../../error/appError";

const GetIngredientsService = async () => {
    const ingredientsRepository = AppDataSource.getRepository(Ingredients)
    const ingredients = await ingredientsRepository.find()

    if(!ingredients){
        throw new AppError(404,"No ingredients registered")
    }

    return ingredients
}

export default GetIngredientsService