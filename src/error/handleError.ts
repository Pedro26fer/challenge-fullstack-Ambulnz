import { Response } from "express"
import { AppError } from "./appError"

export const handleError = (error: AppError, res: Response) => {

    const {statusCode, message} = error

    return res.status(statusCode).json({
        status: 'Error',
        statusCode,
        message
    })
}