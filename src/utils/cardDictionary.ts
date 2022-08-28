import { CardObject } from '../types/types'

export const defenseCards: CardObject[] = [
    {
        name: 'Reinforce Hull',
        rarity: 1,
        resource: 'defense',
        cost: 3,
        actions: [{value: 3, target: 'self', category: 'ship', subCategory: 'hull'}],
        description: 'Hull +3'
    },
    {
        name: 'Space Welders',
        rarity: 2,
        resource: 'defense',
        cost: 3,
        actions: [{value: 1, target: 'self', category: 'resources', subCategory: 'defense'}],
        description: 'Defense +1'
    }
]

export const offenseCards: CardObject[] = [
    {
        name: 'Pulse Beam',
        rarity: 1,
        resource: 'offense',
        cost: 3,
        actions: [{value: 3, target: 'enemy', category: 'ship', subCategory: 'hull' || 'health'}],
        description: '3 damage'
    },
    {
        name: 'Space Welders',
        rarity: 2,
        resource: 'offense',
        cost: 3,
        actions: [{value: 1, target: 'self', category: 'resources', subCategory: 'offense'}],
        description: 'Offense +1'
    }
]

export const powerCards: CardObject[] = [
    {
        name: 'Life Support Systems',
        rarity: 1,
        resource: 'power',
        cost: 3,
        actions: [{value: 3, target: 'self', category: 'ship', subCategory: 'health'}],
        description: 'Ship Health +3'
    },
    {
        name: 'Quantum Generator',
        rarity: 2,
        resource: 'power',
        cost: 3,
        actions: [{value: 1, target: 'self', category: 'resources', subCategory: 'power'}],
        description: 'Power +1'
    }
]

export default module