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
    if (player.hull - amount < 0) {
        change(player, 'health', player.hull - amount)
        player.hull = 0
    } else  {
        change(player, 'hull', -amount)
    }
}