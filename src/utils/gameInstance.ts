import Deck from './deck'
import { CardObject, CardPlayerStats, PlayerStats, HandObject, GameInterface, Player } from '../types/types'
import { resProdMap } from '../constants/resourceNames'

export default class GameInstance {

    newGame() {

        const initialState: GameInterface = {
            started: false,
            turn: 1,
            win: false
        }
      
        return initialState
    }

    newPlayer(): Player {

        const deck = new Deck().buildDeck()
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
            hand: this.drawHand(deck),
            deck: deck
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
            const random: number = Math.floor(Math.random() * deck.length)
            hand.push(deck[random])
        }
        return hand
    }

    playCard(card: CardObject, p: CardPlayerStats, o: CardPlayerStats): void {
        card.actions(p, o)
    }

    discardCard(player: Player, index: number) {
        //splice from player hand based on index
        player.hand.splice(index, 1)
        this.drawCard(player)
    }

    drawCard(player: Player) {
        const random = Math.round(Math.random() * player.deck.length)
        player.hand.push(player.deck[random])
    }
}