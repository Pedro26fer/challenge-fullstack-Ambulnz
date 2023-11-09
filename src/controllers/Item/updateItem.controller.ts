import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import UpdateItemService from "../../services/OrderItem/updateItem.service";


const UpdateItemController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const data = req.body
        await UpdateItemService(id, data)
        return res.status(200).json()
    } catch (error) {
        if( error instanceof AppError){
            return handleError(error, res)
        }
    }
}

export default UpdateItemController