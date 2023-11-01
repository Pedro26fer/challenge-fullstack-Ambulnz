import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import UpdatePizzasService from "../../services/pizzas/updatePizzas.service";

const UpdatePizzaController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const data  = req.body
        await UpdatePizzasService(id, data)
        return res.status(200).json()        
    } catch (error) {
        if(error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default UpdatePizzaController