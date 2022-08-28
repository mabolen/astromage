//SHIP
export interface ShipObject {
    playerId: number,
    hull: number,
    health: number
}

//CARDS
export interface CardAction {
    value: number,
    target: string,
    category: string,
    subCategory: string
}

export interface CardObject {
    name: string,
    rarity: number,
    resource: string,
    cost: number,
    actions: CardAction[],
    description?: string
}

// RESOURCES
export interface Resource {
    name: string,
    unit: string
}

export interface ResourceStore {
    defense: Resource[],
    power: Resource[],
    offense: Resource[]
}

export default module