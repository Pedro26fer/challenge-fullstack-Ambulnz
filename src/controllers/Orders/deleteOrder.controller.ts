import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import DeleteOrderService from "../../services/Orders/deleteOrder.service";


const DeleteOrderController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        await DeleteOrderService(id)
        return res.status(204).json()
    } catch (error) {
        if(error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default DeleteOrderController