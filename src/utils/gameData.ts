import { CardObject, GameInterface, Player } from "../types"
import { connectToMongo, disconnectFromMongo, collections } from '../../game-data-utils/connect'

export type GameDataType = {
    data: any[],
    timestamp: string
  }

export const updateGameData = (p1: Player, p2: Player, gameState: GameInterface, action: string, c: CardObject | null) => {
    return {
        player1: p1,
        player2: p2,
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