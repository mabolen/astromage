// Constants
import { resProdMap } from '../constants'

// Data
import { defenseCards, powerCards, offenseCards } from '../data'

// Types
import { CardObject, CardPlayerStats, PlayerStats, GameInterface, Player } from '../types'

export class GameInstance {
    deck = [defenseCards, offenseCards, powerCards].flat()

    initialInstance: GameInterface = {
        started: false,
        turn: 1,
        win: false,
        winner: ''
    }

    player: Player = {
        stats: {
            material: 5,
            energy: 5,
            ammunition: 5,
            materialProd: 2,
            energyProd: 2,
            ammunitionProd: 2,
            health: 20,
            hull: 10
        },
        hand: [],
        deck: this.deck,
        statusEffects: {
            fire: false,
            corrosion: false,
            healing: false,
            repairing: false,
            noPower: false,
            noDefense: false,
            noOffense: false
        }
    }

    newGame(): GameInterface {
        const initialState: GameInterface = {
            started: true,
            turn: 1,
            win: false,
            winner: ''
        }
      
        return initialState
    }

    newPlayer(): Player {
        const initialStats: PlayerStats = {
            material: 5,
            energy: 5,
            ammunition: 5,
            materialProd: 2,
            energyProd: 2,
            ammunitionProd: 2,
            health: 20,
            hull: 10
        }
        
        return {
            stats: initialStats,
            hand: this.drawHand(this.deck),
            deck: this.deck,
            statusEffects: this.player.statusEffects
        }
    }

    updateResources(p: PlayerStats) {
        for (const key in resProdMap) {
            p[resProdMap[key]] += p[key]
        }
    }

    drawHand(deck: CardObject[]): CardObject[] {
        let hand: CardObject[] = []
        while (hand.length <= 6) {
            hand.push(this.drawCard(deck))
        }
        return hand
    }

    playCard(card: CardObject, p: CardPlayerStats, o: CardPlayerStats): void {
        card.actions(p, o)
    }

    discardCard(player: Player, index: number) {
        player.hand.splice(index, 1)
        player.hand.push(this.drawCard(player.deck))
    }

    drawCard(deck: CardObject[]) {
        let rarity = 0
        const random: number = Math.round(Math.random() * 69)
        switch (true) {
            case random <= 30:
                rarity = 1
                break
            case random <= 50:
                rarity = 2
                break
            case random <= 60:
                rarity = 3
                break
            case random <= 65:
                rarity = 4
                break
            default:
                rarity = 5
        }
        const filteredCards = deck.filter(c => c.rarity === rarity)
        return filteredCards[Math.floor(Math.random() * filteredCards.length)]
    }
}
