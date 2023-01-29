// Packages
import Image from 'next/image'

// Constants
import { statusIcons } from '../../constants'
import ship_1 from '../../../public/images/ship_1.png'
import red_glow from '../../../public/images/effects/redGlow.png'
import blue_glow from '../../../public/images/effects/blue_glow.png'
import ship_2_flipped from '../../../public/images/ship_2_flipped.png'

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
            <div className={styles.shipImageDiv}>
                <Image width={200} height={150} alt={`${name} Ship`} src={player === 'player2' ? ship_2_flipped : ship_1} />
                <div id={`${player}-effects`} className={styles.effectsContainer}>
                    <div id={`${player}-damage-effects`} className={styles.effect}>
                        <Image width={200} height={200} alt={'red glow'} src={red_glow} objectFit={'cover'} />
                    </div>
                    <div id={`${player}-positive-effects`} className={styles.effect}>
                        <Image width={120} height={120} alt={'blue glow'} src={blue_glow} objectFit={'cover'} />
                    </div>
                </div>
            </div>
            <div className={styles.shipUI}>
                <span>Health:&nbsp;{stats.health} </span>
                <span>Hull:&nbsp;{stats.hull}</span>
            </div>
            <div className={styles.statusEffects}>
                {statusEffects && Object.keys(statusEffects).map((e) =>
                    statusEffects[e].time > 0 && <div key={e} className={styles.statusIcon}><Image alt={`Status Effect ${e}`} src={statusIcons[e]} width={24} height={24}></Image></div>
                )}
            </div>
        </div>
    )
}

export default Ship
