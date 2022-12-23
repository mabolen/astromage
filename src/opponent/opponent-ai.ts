import { CardObject, Player, PlayerStats } from "../types";
import { resMap } from "../constants";

export class OpponentAI {

    playTurn(p: Player, o: Player) {
        const startStats = {
            material: 5,
            energy: 5,
            ammo: 5,
            materialProd: 2,
            energyProd: 2,
            ammoProd: 2,
            health: 20,
            hull: 10
        }

        const playable = (stats: PlayerStats, card: CardObject): boolean => {
            return stats[resMap[card.type]] >= card.cost
        }
        const processStats = () => {
            const hp = p.stats.health / startStats.health
            if (hp <= 0.5) {
                console.log('defensive')
            } else {
                console.log('aggro')
            }
        }

        const playableCards = p.hand.filter(c => playable(p.stats, c))
        const index = playableCards.length > 0 ? Math.floor(Math.random() * playableCards.length) : Math.floor(Math.random() * p.hand.length)
        const cardIndex = p.hand.findIndex(c => c.name === playableCards[index].name)
        
        return {
            action: playableCards.length > 0 ? 'play' : 'discard',
            index: playableCards.length > 0 ? cardIndex : index
        }
    }

    aggressivePlay(player: Player) {

    }

    defensivePlay(player: Player) {

    }
}