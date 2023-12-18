import { AppDataSource } from "../../data-source";
import { Ingredients } from "../../entities/ingredients.entity";
import { AppError } from "../../error/appError";

const DeleteIngredientsService = async (id : string) => {

    const ingredientsRepository = AppDataSource.getRepository(Ingredients)

    const ingredientToDelete = await ingredientsRepository.findOne({where:{id: id}})
    
    if(!ingredientToDelete){
        throw new AppError(404, "Ingredient not found")
    }

    await ingredientsRepository.delete(id)

    return true

}

export default DeleteIngredientsService