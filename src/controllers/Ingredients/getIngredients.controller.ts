import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import GetIngredientsService from "../../services/Ingredients/getIngredients.service";


const GetIngredientsController = async (req: Request, res: Response) => {
    try {
        const ingredients = await GetIngredientsService()
        return res.status(200).json(ingredients)
    } catch (error) {
        if(error instanceof AppError){
            handleError(error,res)
        }
    }
}

export default GetIngredientsController