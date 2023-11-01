import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import GetPizzasService from "../../services/pizzas/getPizzas.service";
import { IPizza } from "../../interfaces/pizzas/pizzas.interface";



const GetPizzasController = async (req: Request, res:Response): Promise<IPizza[] | any> => {
    try {
        const pizzas = await GetPizzasService()
        return res.status(200).json(pizzas)
        
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }
}

export default GetPizzasController