import { CardPlayerStats } from "../types/types"

export const set = (
    player: CardPlayerStats,
    target: keyof CardPlayerStats,
    amount: number
) => {
    player[target] = amount
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
    change(player, 'hull', -amount)
    if (player.hull - amount < 0) change(player, 'health', player.hull - amount)
}