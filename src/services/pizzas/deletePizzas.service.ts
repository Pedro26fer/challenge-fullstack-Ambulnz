import { AppDataSource } from "../../data-source"
import { Pizza } from "../../entities/pizza.entity"
import { AppError } from "../../error/appError"


const DeletePizzaService = async (id: string) => {
    const pizzaRepository = AppDataSource.getRepository(Pizza)

    const deletedPizza = await pizzaRepository.findOne({
        where: {id}
    })

    if(!deletedPizza){
        throw new AppError(404, "Pizza not found")
    }
    await pizzaRepository.delete(id)

    return "Pizza deleted"
}

export default DeletePizzaService