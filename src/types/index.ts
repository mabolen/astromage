//GAME
export interface GameInterface {
    started: boolean
    turn: number
    win: boolean
    winner: string
}

//SHIP
export interface ShipObject {
    playerId: number
    hull: number
    health: number
}

//CARDS
export interface CardOther {
    playagain?: boolean
    drawDiscardPlayagain?: boolean
    undiscardable?: boolean
    status?: string
}

export type CardType = 'defense' | 'offense' | 'power'

export interface CardObject {
    name: string
    description: string
    type: CardType
    cost: number
    rarity: number
    other?: CardOther
    actions: (p: CardPlayerStats, o: CardPlayerStats) => void
    status?: (s: StatusEffects) => void
}

export type CardPlayerStats = PlayerStats

export interface ActiveCard {
    card: CardObject
    id: string
}

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
export type PlayerName = 'player1' | 'player2'

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
    hand: CardObject[]
    deck: CardObject[]
    statusEffects: StatusEffects
  }

  export interface StatusEffects {
    [key: string]: Status
    fire: Status
    corrosion: Status
    healing: Status
    repairing: Status
    noPower: Status
    noDefense: Status
    noOffense: Status
  }

  export interface Status {
    active: boolean
    time: number
  }

export default module
