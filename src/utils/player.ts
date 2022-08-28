import Deck from '../utils/deck'
import { CardObject } from '../types/types'

export default class Player {
    name: string
    id: number
    deck: Deck

    constructor(name: string, id: number, deck: Deck) {
        this.name = name
        this.id = id
        this.deck = deck
    }
}