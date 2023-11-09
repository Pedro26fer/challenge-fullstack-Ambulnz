import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import GetItemService from "../../services/OrderItem/getItem.service";


const GetItemsController = async (req: Request, res: Response) => {
    try {
        const items = await GetItemService()
        return res.status(200).json(items)
    } catch (error) {
        if(error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default GetItemsController