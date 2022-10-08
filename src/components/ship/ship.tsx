// Packages
import Image from 'next/image'

// Constants
import { statusIcons } from '../../constants'
import ship from '../../../public/images/ship.png'
import ship2 from '../../../public/images/ship2.png'

// Styles
import styles from './ship.module.css'

// Types
import { PlayerName, PlayerStats, StatusEffects } from '../../types'

export type Props = {
    player: PlayerName
    stats: PlayerStats
    statusEffects?: StatusEffects
    turn: number
}

const Ship = ({ player, stats, statusEffects, turn }: Props) => {
    const name = player === 'player1' ? 'Player 1' : 'Player 2'
    
    return (
        <div className={styles.ship}>
            <span className={styles.playerName}>{name}</span>
            <span>Health: {stats.health}</span>
            <span>Hull: {stats.hull}</span>
            <Image width={200} height={200} alt={`${name} Ship`} src={player === 'player2' ? ship2 : ship}></Image>
            <div className={styles.statusEffects}>
                {statusEffects && Object.keys(statusEffects).map((e) =>
                    statusEffects[e].active && <div key={e} className={styles.statusIcon}><Image alt={`Status Effect ${e}`} src={statusIcons[e]} width={24} height={24}></Image></div>
                )}
            </div>
        </div>
    )
}

export default Ship
