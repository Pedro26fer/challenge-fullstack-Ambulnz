import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import DeleteIngredientsService from "../../services/Ingredients/deleteIngredient.service";


const DeleteIngredientsController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await DeleteIngredientsService(id)
        return res.status(202).json("Ingredient excluded")
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default DeleteIngredientsController