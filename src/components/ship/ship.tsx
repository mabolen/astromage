import styles from './ship.module.css'
import ship from '../../../public/images/ship.png'
import ship2 from '../../../public/images/ship2.png'
import { statusIcons } from '../../constants/statusEffects'
import Image from 'next/image'
import { PlayerStats, StatusEffects } from '../../types/types'

const Ship = (props: any) => {

    const player = props.player
    const stats: PlayerStats = props.stats
    const statusEffects: StatusEffects = props.statusEffects

    return (
        <div className={styles.ship}>
            <span>Health: {stats.health}</span>
            <span>Hull: {stats.hull}</span>
            <Image width={200} height={200} src={player === 'player2' ? ship2 : ship}></Image>
            <div className={styles.statusEffects}>
                {Object.keys(statusEffects).map((e) => 
                    statusEffects[e] ? <div key={e} className={styles.statusIcon}><Image src={statusIcons[e]} width={24} height={24}></Image></div> : null
                )}
            </div>
        </div>
    )
}

export default Ship