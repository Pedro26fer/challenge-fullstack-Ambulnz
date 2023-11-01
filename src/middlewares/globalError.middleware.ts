import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/appError";
import { handleError } from "../error/handleError";


export const globalErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction ) => {
    if(err instanceof AppError){
        return handleError(err,res)
    }
    else if(err){
        return res.status(500).json({
            status: 'Error',
            message: 'Internal Error'
        })
    }

    next()

}