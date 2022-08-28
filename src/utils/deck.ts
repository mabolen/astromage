import { CardObject } from '../types/types'
import { defenseCards, offenseCards, powerCards } from '../data/cardDictionary'

export default class Deck {

    deck: CardObject[] = [defenseCards, offenseCards, powerCards].flat()

    buildDeck() {
        let output: CardObject[] = []
        this.deck.forEach(c => {
            output.push(this.deck[Math.floor(Math.random() * this.deck.length)])
        })
        return output
    }
}