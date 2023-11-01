import { AppDataSource } from "../../data-source"
import { Pizza } from "../../entities/pizza.entity"
import { AppError } from "../../error/appError"
import { IPizzaToUpdated } from "../../interfaces/pizzas/pizzas.interface"

const UpdatePizzasService = async (id: string, data: IPizzaToUpdated) => {
    const pizzaRepository = AppDataSource.getRepository(Pizza)

    const pizzaToUpdate = await pizzaRepository.findOne({
        where: {id}
    })

    if(!pizzaToUpdate){
        throw new AppError(404, "Pizza not found")
    }

    await pizzaRepository.update(pizzaToUpdate.id, data)

    return true

}

export default UpdatePizzasService