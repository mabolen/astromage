import Player from './player'
import Deck from './deck'
import { CardObject, CardPlayerStats, PlayerStats } from '../types/types'

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
      
        return {
          started: false,
          turn: 1,
          win: false,
          activeCards: [],
          playerOne: {
              stats: initialStats,
              hand: deck1
          },
          playerTwo: {
              stats: initialStats,
              hand: deck2
          }
        }
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
        const random = Math.round(Math.random() * deck.length)
        hand.push(deck[random])
    }
}