import { CardObject, Player, PlayerStats } from "../types";
import { resMap } from "../constants";

export class OpponentAI {

    playTurn(player: Player) {

        const playable = (stats: PlayerStats, card: CardObject): boolean => {
            return stats[resMap[card.type]] >= card.cost
        }

        const playableCards = player.hand.filter(c => playable(player.stats, c))
        const index = playableCards.length > 0 ? Math.floor(Math.random() * playableCards.length) : Math.floor(Math.random() * player.hand.length)
        const cardIndex = player.hand.findIndex(c => c.name === playableCards[index].name)
        
        return {
            action: playableCards.length > 0 ? 'play' : 'discard',
            index: playableCards.length > 0 ? cardIndex : index
        }
    }
}