import { CardObject, CardPlayerStats } from '../types/types'
import { set, change, damage } from './cardEffects'

// Should these be separate? By rarity?
export const defenseCards: CardObject[] = [
    {
        name: 'Reinforce Hull',
        description: 'Hull +3',
        type: 'defense',
        cost: 3,
        rarity: 1,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => change(p, 'hull', 3)
    },
    {
        name: 'Space Welders',
        description: 'Defense +1',
        type: 'defense',
        cost: 3,
        rarity: 2,
        actions: (p: CardPlayerStats, o: CardPlayerStats) => change(p, 'materialProd', 1)
    }
]

export const offenseCards: CardObject[] = [
    {
        name: 'Pulse Beam',
        description: '3 damage',
        type: 'offense',
        cost: 3,
        rarity: 1,
        actions: (p, o) => change(o, 'hull', 3)
    },
    {
        name: 'Laser Factory',
        description: 'Offense +1',
        type: 'offense',
        cost: 3,
        rarity: 2,
        actions: (p, o) => change(p, 'ammunitionProd', 1)   
    }
]

export const powerCards: CardObject[] = [
    {
        name: 'Life Support Systems',
        description: 'Ship Health +3',
        type: 'power',
        cost: 3,
        rarity: 1,
        actions: (p, o) => change(p, 'health', 3)  
        
    },
    {
        name: 'Quantum Generator',
        description: 'Power +1',
        type: 'power',
        cost: 3,
        rarity: 2,
        actions: (p, o) => change(p, 'energyProd', 1)
        
    }
]

export default module