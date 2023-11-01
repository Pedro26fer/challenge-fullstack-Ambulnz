import { AppDataSource } from "../../data-source";
import { Pizza } from "../../entities/pizza.entity";
import { AppError } from "../../error/appError";
import { IPizza } from "../../interfaces/pizzas/pizzas.interface";


const RegisterPizzaService = async ({name, preco}: IPizza) => {
    const pizzaRepository = AppDataSource.getRepository(Pizza)

    const nameAlreadyRegister = await pizzaRepository.findOne({
        where: {name}
    })

    if(nameAlreadyRegister){
        throw new AppError(403, "Pizza already register")
    }

    const newPizza = await pizzaRepository.save({
        name,
        preco
    })

    return newPizza
}

export default RegisterPizzaService