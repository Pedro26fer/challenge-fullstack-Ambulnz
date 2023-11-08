import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import GetOrdersService from "../../services/Orders/getOrders.service";


const GetOrdersController = async (req: Request, res: Response) => {
    try {
        const order = await GetOrdersService()
        return res.status(200).json(order)
    } catch (error) {
        if(error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default GetOrdersController