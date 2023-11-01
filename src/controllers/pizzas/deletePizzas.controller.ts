import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import DeletePizzaService from "../../services/pizzas/deletePizzas.service";

const DeletePizzasController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        await DeletePizzaService(id)
        return res.status(204).json()
    } catch (error) {
        if( error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default DeletePizzasController