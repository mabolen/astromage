import { CardObject, GameInterface, Player } from "../types"
import { connectToMongo, disconnectFromMongo, collections } from '../../game-data-utils/connect'
import { platform } from "os"

export type GameDataType = {
    data: any[],
    timestamp: Date
  }

export const updateGameData = (p1: Player, p2: Player, gameState: GameInterface, action: string, c: CardObject | null) => {
    return {
        player1: {
            stats: p1.stats,
            hand: p1.hand,
            statusEffects: p1.statusEffects
        },
        player2: {
            stats: p2.stats,
            hand: p2.hand,
            statusEffects: p2.statusEffects
        },
        gameState: gameState,
        action: action,
        card: c
    }
}

export const writeData = async (d: GameDataType) => {
    await fetch(
        `http://localhost:3000/api/game-data`,
        {
          body: JSON.stringify(d),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST'
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }