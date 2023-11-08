import { Request, Response } from "express";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import RetrivingEspecificService from "../../services/Orders/retrivingEspecificOrder.service";

const RetrivingEspecificController = async (req: Request, res: Response) => {

    try {
        const {id} = req.params
        const order = await RetrivingEspecificService(id)
        return res.status(200).json(order)
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res)
        }
    }

}

export default RetrivingEspecificController