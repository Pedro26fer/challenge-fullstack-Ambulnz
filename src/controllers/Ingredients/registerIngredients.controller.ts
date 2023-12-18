import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import RegisterIngredientService from "../../services/Ingredients/registerIngredients.service";
import { handleError } from "../../error/handleError";



const RegisterIngredientsController = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const newIngredient = await RegisterIngredientService({name})
        return res.status(201).json(newIngredient)
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default RegisterIngredientsController