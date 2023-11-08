import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import CreateOrderService from "../../services/Orders/createOrder.service";



const CreateOrderController = async (req: Request, res: Response) => {
    try {
        const order = await CreateOrderService()
        return res.status(201).json(order)
    } catch (error) {
        if (error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default CreateOrderController