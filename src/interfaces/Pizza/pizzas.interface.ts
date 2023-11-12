export interface IPizza {
    name: string,
    price: number
}

export interface IPizzaReturned {
    id: string
    name: string,
    price: string
}

export interface IPizzaToUpdated {
    name?: string,
    price?: any
}