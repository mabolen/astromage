import { Player, CardPlayerStats, StatusEffects } from "../types"

const minimumValue = (p: CardPlayerStats, t: keyof CardPlayerStats) => {
    if (t === 'materialProd' || t === 'energyProd' || t === 'ammoProd') {
        return p[t] <= 0 ? 1 : p[t]
    // } else if (t === 'hull' || t === 'health') {
    //     return p[t]
    } else {
        return p[t] < 0 ? 0 : p[t]
    }
}

export const set = (
    player: CardPlayerStats,
    target: keyof CardPlayerStats,
    amount: number
) => {
    player[target] = amount
    player[target] = minimumValue(player, target)
}

export const change = (
    player: CardPlayerStats,
    target: keyof CardPlayerStats,
    amount: number
) => {
    set(player, target, player[target] + amount)
}

export const damage = (
    player: CardPlayerStats,
    amount: number
) => {
    if (player.hull - amount < 0) {
        change(player, 'health', player.hull - amount)
        player.hull = 0
    } else  {
        change(player, 'hull', -amount)
    }
}

export const status = (
    playerStatus: StatusEffects,
    target: keyof StatusEffects,
    duration: number
) => {
    playerStatus[target].time = duration
}