import { Request, Response } from "express";
import { IPizza } from "../../interfaces/pizzas/pizzas.interface";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import RegisterPizzaService from "../../services/pizzas/registerPizza.service";


const RegisterPizzaController = async (req: Request, res: Response): Promise<IPizza | any> => {
    try {
        const {name, preco} = req.body
        const newPizza = await RegisterPizzaService({name, preco}) 
        return res.status(201).json({
            newPizza
        })    
    } catch (error) {
        if(error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default RegisterPizzaController