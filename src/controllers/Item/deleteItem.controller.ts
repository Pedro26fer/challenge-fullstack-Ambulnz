import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import DeleteItemService from "../../services/OrderItem/deleteItem.service";


const DeleteItemController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        await DeleteItemService(id)
        return res.status(204).json()
    } catch (error) {
        if(error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default DeleteItemController