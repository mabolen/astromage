import { CardObject, CardPlayerStats } from '../types/types'
import { set, change, damage } from './cardEffects'

// Should these be separate? By rarity?

/* What needs to be done: 1. make rarity matter 2. handle cost differently 3. balance cards */

export const defenseCards: CardObject[] = [
    {
        name: 'Reinforce Hull',
        description: 'Hull +3',
        type: 'defense',
        cost: 3,
        rarity: 1,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'hull', 3)
        }
    },
    {
        name: 'Ghost Ship Salvage',
        description: 'Hull +5',
        type: 'defense',
        cost: 4,
        rarity: 2,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'hull', 5)
        }
    },
    {
        name: 'Arclight Torches',
        description: 'Hull +7',
        type: 'defense',
        cost: 5,
        rarity: 3,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'hull', 7)
        }
    },
    {
        name: 'Space Welders',
        description: 'Defense +1',
        type: 'defense',
        cost: 3,
        rarity: 2,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'materialProd', 1)
        }
    },
    {
        name: 'Rare Ore Asteroid Mining Facility',
        description: 'Defense +2',
        type: 'defense',
        cost: 6,
        rarity: 4,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'materialProd', 2)
        }
    },
    {
        name: 'Sabotage Mining',
        description: '-1 Enemy Defense',
        type: 'defense',
        cost: 3,
        rarity: 2,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(o, 'materialProd', -1)
        }
    },
    {
        name: 'Rare Ore Asteroid Mining Facility',
        description: 'Defense +2',
        type: 'defense',
        cost: 8,
        rarity: 4,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'materialProd', 2)
        }
    },
    {
        name: 'Recycle Material',
        description: 'Defense -1, Ammunition +6, Offense +1',
        type: 'defense',
        cost: 6,
        rarity: 3,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'materialProd', -1)
            change(p, 'ammunition', 6)
            change(p, 'ammunitionProd', 1)
        }
    },
    {
        name: 'Radioactive Deposits',
        description: 'Energy +5, Power +1',
        type: 'defense',
        cost: 4,
        rarity: 3,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'energy', 5)
            change(p, 'energyProd', 1)
        }
    },
    {
        name: 'Elemental Discoveries',
        description: 'Defense +1, Power +1, Offense +1',
        type: 'defense',
        cost: 6,
        rarity: 3,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => {
            change(p, 'materialProd', 1)
            change(p, 'energyProd', 1)
            change(p, 'ammunitionProd', 1)
        }
    }
]

export const offenseCards: CardObject[] = [
    {
        name: 'Pulse Beam',
        description: '3 damage',
        type: 'offense',
        cost: 3,
        rarity: 1,
        actions: (p, o) => {
            damage(o, 3)
        }
    },
    {
        name: 'Pulse Bomb',
        description: '5 damage',
        type: 'offense',
        cost: 4,
        rarity: 1,
        actions: (p, o) => {
            damage(o, 5)
        }
    },
    {
        name: 'Laser Turret',
        description: '2 damage',
        type: 'offense',
        cost: 2,
        rarity: 1,
        actions: (p, o) => {
            damage(o, 2)
        }
    },
    {
        name: 'Kinetic Shot',
        description: '3 damage',
        type: 'offense',
        cost: 2,
        rarity: 2,
        actions: (p, o) => {
            damage(o, 3)
        }
    },
    {
        name: 'Magnetic Accelerators',
        description: '5 damage, -1 Enemy Defense',
        type: 'offense',
        cost: 6,
        rarity: 3,
        actions: (p, o) => {
            damage(o, 5)
            change(o, 'materialProd', -1)
        }
    },
    {
        name: 'Missile Barrage',
        description: '6 damage',
        type: 'offense',
        cost: 4,
        rarity: 2,
        actions: (p, o) => {
            damage(o, 6)
        }
    },
    {
        name: 'Rebel Mercs',
        description: '8 damage, -4 Energy',
        type: 'offense',
        cost: 4,
        rarity: 3,
        actions: (p, o) => {
            damage(o, 8)
            change(p, 'energy', -4)
        }
    },
    {
        name: 'Laser Factory',
        description: 'Offense +1',
        type: 'offense',
        cost: 3,
        rarity: 2,
        actions: (p, o) => {
            change(p, 'ammunitionProd', 1)
        }   
    },
    {
        name: 'Advanced Weaponry',
        description: 'Offense +1, 5 Damage',
        type: 'offense',
        cost: 5,
        rarity: 3,
        actions: (p, o) => {
            change(p, 'ammunitionProd', 1)
            damage(o, 5)
        }   
    },
    {
        name: 'Fleet General',
        description: 'Offense +2, 15 Damage',
        type: 'offense',
        cost: 13,
        rarity: 5,
        actions: (p, o) => {
            change(p, 'ammunitionProd', 2)
            damage(o, 15)
        }   
    },
    {
        name: 'Jam Systems',
        description: 'Enemy Offense -2',
        type: 'offense',
        cost: 7,
        rarity: 3,
        actions: (p, o) => {
            change(o, 'ammunitionProd', -2)
        }   
    },
    {
        name: 'Attack Supply Lines',
        description: '-1 all Enemy Production',
        type: 'offense',
        cost: 6,
        rarity: 3,
        actions: (p, o) => {
            change(o, 'ammunitionProd', -1)
            change(o, 'energyProd', -1)
            change(o, 'materialProd', -1)
        }   
    },
    {
        name: 'Photon Torpedo',
        description: '13 damage',
        type: 'offense',
        cost: 7,
        rarity: 4,
        actions: (p, o) => {
            damage(o, 13)
        }   
    },
    {
        name: 'Ram',
        description: 'Deal 10, take 5 Damage',
        type: 'offense',
        cost: 5,
        rarity: 3,
        actions: (p, o) => {
            damage(p, 5)
            damage(o, 10)
        }
    }
]

export const powerCards: CardObject[] = [
    {
        name: 'Life Support Systems',
        description: 'Ship Health +3',
        type: 'power',
        cost: 3,
        rarity: 1,
        actions: (p, o) => {
            change(p, 'health', 3)
        }
    },
    {
        name: 'Android Hospital',
        description: 'Ship Health +10',
        type: 'power',
        cost: 5,
        rarity: 3,
        actions: (p, o) => {
            change(p, 'health', 10)
        }
    },
    {
        name: 'Theseus System',
        description: 'Ship Health +8, Hull +4',
        type: 'power',
        cost: 7,
        rarity: 3,
        actions: (p, o) => {
            change(p, 'health', 8)
            change(p, 'hull', 4)
        }
    },
    {
        name: 'Psy-Scout Prospecting',
        description: 'Defense +1, Material +4',
        type: 'power',
        cost: 3,
        rarity: 2,
        actions: (p, o) => {
            change(p, 'materialProd', 1)
            change(p, 'material', 4)
        }
    },
    {
        name: 'Quantum Generator',
        description: 'Power +1',
        type: 'power',
        cost: 3,
        rarity: 2,
        actions: (p, o) => {
            change(p, 'energyProd', 1)
        }
    },
    {
        name: 'Energy Weapons',
        description: 'Offense +1, Ammunition +5',
        type: 'power',
        cost: 6,
        rarity: 3,
        actions: (p, o) => {
            change(p, 'ammunitionProd', 1)
            change(p, 'ammunition', 5)
        }
    },
    {
        name: 'Sacrifice',
        description: 'Power -2, Health +15',
        type: 'power',
        cost: 6,
        rarity: 3,
        actions: (p, o) => {
            change(p, 'energyProd', -2)
            change(p, 'health', 15)
        }
    },
    {
        name: 'Cosmic Dragon',
        description: 'Power +1, Offense +1, 12 Damage',
        type: 'power',
        cost: 12,
        rarity: 5,
        actions: (p, o) => {
            change(p, 'energyProd', 1)
            change(p, 'ammunitionProd', 1)
            damage(o, 12)
        }
    },
    {
        name: 'Ancient Knowledge',
        description: 'Power +2, Defense -1',
        type: 'power',
        cost: 6,
        rarity: 3,
        actions: (p, o) => {
            change(p, 'energyProd', 2)
            change(p, 'materialProd', -1)
        }
    },
    {
        name: 'Energy Leeches',
        description: 'Steal 5 Energy, 5 Damage',
        type: 'power',
        cost: 7,
        rarity: 3,
        actions: (p, o) => {
            change(p, 'energy', 5)
            change(o, 'energy', -5)
            damage(o, 5)
        }
    },
]

export default module