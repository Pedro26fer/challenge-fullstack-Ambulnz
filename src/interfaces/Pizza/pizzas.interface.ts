import { Ingredients } from "../../entities/ingredients.entity"

export interface IPizza {
    name: string,
    price: number,
    ingredients: string[]
}

export interface IPizzaReturned {
    id: string
    name: string,
    price: string,
    ingredients: Ingredients[]
}

export interface IPizzaToUpdated {
    name?: string,
    price?: any,
}