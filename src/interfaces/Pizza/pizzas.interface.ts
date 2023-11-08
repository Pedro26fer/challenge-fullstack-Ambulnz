export interface IPizza {
    name: string,
    preco: number
}

export interface IPizzaReturned {
    name: string,
    preco: string
}

export interface IPizzaToUpdated {
    name?: string,
    preco?: any
}