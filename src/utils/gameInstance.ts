import Player from './player'
import Deck from './deck'

export default class GameInstance {
    player1Name: string
    player2Name: string

    constructor(player1Name: string, player2Name: string) {
        this.player1Name = player1Name
        this.player2Name = player2Name
    }

    deck1 = new Deck()
    deck2 = new Deck()

    startGame() {
        const player1 = new Player(this.player1Name, 1, this.deck1)
        const player2 = new Player(this.player1Name, 2, this.deck2)
    }
}