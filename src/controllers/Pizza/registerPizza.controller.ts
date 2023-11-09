import { Request, Response } from "express";
import { IPizza } from "../../interfaces/Pizza/pizzas.interface";
import { AppError } from "../../error/appError";
import { handleError } from "../../error/handleError";
import RegisterPizzaService from "../../services/Pizzas/registerPizza.service";

const RegisterPizzaController = async (
  req: Request,
  res: Response
): Promise<IPizza | any> => {
  try {
    const { name, price } = req.body;
    const newPizza = await RegisterPizzaService({ name, price });
    return res.status(201).json({
      newPizza,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(error, res);
    }
  }
};

export default RegisterPizzaController;
