import Deck from "../utils/deck"

//GAME
export interface GameInterface {
    started: boolean
    turn: number
    win: boolean
}

//SHIP
export interface ShipObject {
    playerId: number
    hull: number
    health: number
}

//CARDS
export interface CardOther {
    playagain?: boolean;
    drawDiscardPlayagain?: boolean
    undiscardable?: boolean
}

export interface CardObject {
    name: string
    description?: string
    type: string
    cost: number
    rarity: number
    other?: CardOther
    actions: (p: CardPlayerStats, o: CardPlayerStats) => void
}

export type HandObject = CardObject[]

export type CardPlayerStats = PlayerStats

// RESOURCES
export interface Resource {
    name: string
    unit: string
    production: number
}

export interface ResourceStore {
    defense: Resource[]
    power: Resource[]
    offense: Resource[]
}

export interface ResourceMap {
    [key: string]: string
    defense: 'material'
    power: 'energy'
    offense: 'ammunition'
}

export interface ResProdMap {
    [key: string]: string
    materialProd: 'material'
    energyProd: 'energy'
    ammunitionProd: 'ammunition'
}

//Player
export interface PlayerStats {
    [key: string]: number
    material: number
    energy: number
    ammunition: number
    materialProd: number
    energyProd: number
    ammunitionProd: number
    health: number
    hull: number
  }

  export interface Player {
    stats: PlayerStats
    hand: HandObject
    deck: CardObject[]
  }

  export interface Players {
    player1: Player
    player2: Player
  }

export default module