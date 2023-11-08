import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import CreateItemService from "../../services/OrderItem/createItem.service";


const CreateItemController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const { quantity, pizza} = req.body
        const item = await CreateItemService(id, {quantity, pizza})
        return res.status(201).json(item)
    } catch (error) {
        if (error instanceof AppError){
            return handleError(error,res)
        }
    }
}

export default CreateItemController