import styles from './ship.module.css'
import ship from '../../../public/images/ship.png'
import ship2 from '../../../public/images/ship2.png'
import { statusIcons } from '../../constants/statusEffects'
import Image from 'next/image'
import { PlayerName, PlayerStats, StatusEffects } from '../../types/types'

export type Props = {
    player: PlayerName
    stats: PlayerStats
    statusEffects?: StatusEffects
}

const Ship = ({ player, stats, statusEffects }: Props) => {
    const name = player === 'player1' ? 'Player 1' : 'Player 2'

    return (
        <div className={styles.ship}>
            <span className={styles.playerName}>{name}</span>
            <span>Health: {stats.health}</span>
            <span>Hull: {stats.hull}</span>
            <Image width={200} height={200} alt={`${name} Ship`} src={player === 'player2' ? ship2 : ship}></Image>
            <div className={styles.statusEffects}>
                {statusEffects && Object.keys(statusEffects).map((e) =>
                    statusEffects[e] ? <div key={e} className={styles.statusIcon}><Image alt={`Status Effect ${e}`} src={statusIcons[e]} width={24} height={24}></Image></div> : null
                )}
            </div>
        </div>
    )
}

export default Ship
