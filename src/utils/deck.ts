import { CardObject, CardAction, Resource } from '../types/types'
import { defenseCards, offenseCards, powerCards } from './cardDictionary'

export default class Deck {
    resources: Resource[] = [
        {name: 'defense', unit: 'material'},
        {name: 'power', unit: 'energy'},
        {name: 'offense', unit: 'ammunition'}
    ]

    deck: CardObject[] = [defenseCards, offenseCards, powerCards].flat()

    buildDeck() {
    }
}