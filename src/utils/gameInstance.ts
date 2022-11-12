// Constants
import { resProdMap, resMap, statusActions  } from '../constants'

// Data
import { defenseCards, powerCards, offenseCards, set, change, damage } from '../data'

// Types
import { CardObject, PlayerStats, GameInterface, Player, StatusAction, Status, StatusEffects } from '../types'

// Utilities
import { Animator } from './'

export class GameInstance {
    deck = [defenseCards, offenseCards, powerCards].flat()

    initialInstance: GameInterface = {
        started: false,
        turn: 1,
        win: false,
        winner: ''
    }

    animator = new Animator()

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

        const statusEffects: StatusEffects = {
            fire: {
                name: 'fire',
                time: 0,
                action: statusActions.fire
            },
            corrosion: {
                name: 'corrosion',
                time: 0,
                action: statusActions.corrosion
            },
            healing: {
                name: 'healing',
                time: 0,
                action: statusActions.healing
            },
            repairing: {
                name: 'repairing',
                time: 0,
                action: statusActions.repairing
            },
            noPower: {
                name: 'noPower',
                time: 0,
                action: statusActions.noPower
            },
            noDefense: {
                name: 'noDefense',
                time: 0,
                action: statusActions.noDefense
            },
            noOffense: {
                name: 'noOffense',
                time: 0,
                action: statusActions.noOffense
            }
        }
        
        return {
            stats: initialStats,
            hand: this.drawHand(this.deck),
            deck: this.deck,
            statusEffects: statusEffects,
            name: ''
        }
    }

    async winCondition(player: PlayerStats, opponent: PlayerStats) {
        const resourceWin = (player.energy >= 50 || player.ammunition >= 50 || player.material >= 50 || player.health >= 50)
        return opponent.health <= 0 || resourceWin
    }

    async checkWin(gameState: GameInterface, player1: Player, player2: Player) {
        if (await this.winCondition(player1.stats, player2.stats)) {
            console.log('Player 1 wins!')
            gameState.started = false; gameState.win = true; gameState.winner = 'Player 1'
            return { ...gameState }
        }
        if (await this.winCondition(player2.stats, player1.stats)) {
            console.log('Player 2 wins!')
            gameState.started = false; gameState.win = true; gameState.winner = 'Player 2'
            return { ...gameState }
        }
    }

    updateResources(p: PlayerStats) {
        for (const key in resProdMap) {
            p[resProdMap[key]] += p[key]
        }
    }

    drawHand(deck: CardObject[]): CardObject[] {
        let hand: CardObject[] = []
        while (hand.length < 6) {
            hand.push(this.drawCard(deck))
        }
        return hand
    }

    async playCard(c: CardObject, p: Player, o: Player, index: number) {
        await this.animator.animatePlay(`card-${index}`)
        c.actions(p, o)
        p.stats[resMap[c.type]] -= c.cost
    }

    async discardCard(player: Player, index: number) {
        await this.animator.animateDiscard(`card-${index}`)
        player.hand.splice(index, 1, this.drawCard(player.deck))
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

    statusHandler(p: Player) {
        Object.keys(p.statusEffects).forEach(e => {
            p.statusEffects[e]
            if (p.statusEffects[e].time > 0) {
                this.statusEffectAction(p, p.statusEffects[e])
            }
        })
    }

    statusEffectAction(p: Player, s: Status) {
        const { name, time, action } = s
        const { target, effect, amount } = action

        const actionMap: any = {
            set: () => set(p.stats, target, amount),
            change: () => change(p.stats, target, amount),
            damage: () => damage(p.stats, amount)
        }

        if (time > 0) {
            actionMap[effect]()
            p.statusEffects[name].time--
        }
    }
}