import Player from './player'
import Deck from './deck'
import { CardObject, CardPlayerStats, PlayerStats, HandObject, GameInterface } from '../types/types'

export default class GameInstance {

    newGame() {
        const deck1 = new Deck().buildDeck()
        const deck2 = new Deck().buildDeck()
      
        //TODO: add ruleset to make starting stats/conditions dynamic based on user selections
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

        const initialState: GameInterface = {
            started: false,
            turn: 1,
            win: false,
            activeCards: [],
            playerOne: {
                stats: initialStats,
                hand: this.drawHand(deck1),
                deck: deck1
            },
            playerTwo: {
                stats: initialStats,
                hand: this.drawHand(deck2),
                deck: deck2
            }
        }
      
        return initialState
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

    discardCard(hand: CardObject[], index: number, deck: CardObject[]) {
        //splice from player hand based on index
        const random = Math.round(Math.random() * deck.length)
        hand.splice(index, 1)
    }

    drawCard(hand: CardObject[], deck: CardObject[]) {
        let cardsInHand = hand.length
        const random = Math.round(Math.random() * deck.length)
        while(cardsInHand < 6) {
            hand.push(deck[random])
        }
    }
}