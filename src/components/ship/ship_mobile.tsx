// Packages
import Image from 'next/image'

// Constants
import { statusIcons } from '../../constants'
import ship_1 from '../../../public/images/ship_1.png'
import red_glow from '../../../public/images/effects/redGlow.png'
import blue_glow from '../../../public/images/effects/blue_glow.png'
import ship_2_flipped from '../../../public/images/ship_2_flipped.png'
import { resMap } from '../../constants'

// Utilities
import { capitalize } from '../../utils'

// Styles
import styles from './ship_mobile.module.css'

// Types
import { PlayerName, PlayerStats, StatusEffects } from '../../types'

export type Props = {
    player: PlayerName
    stats: PlayerStats
    statusEffects?: StatusEffects
    turn: number
}

const Resource = ({ stats, type }: { stats: PlayerStats, type: string }) => {

    return (
        <div className={styles.resource}>
            <div className={styles.resourceImgContainer}>
                <img src={`/images/${type}.png`} className={`${styles.imgDiv}`} />
                <div className={`${styles.resourceCounter} ${type}`}>
                    <span className={styles.resourceCount}>{stats[resMap[type]]}</span>
                </div>
            </div>
            <div className={styles.prodContainer}>
                <div className={styles.prodDiv}>
                    <img src="/images/arrow-up-solid.svg" alt="arrow/up" width={10} />
                    <div>{stats[`${resMap[type]}Prod`]}</div>
                </div>
                <div className={styles.resourceCount}>{capitalize(resMap[type])}</div>
            </div>
        </div>
    )
}

const ShipUI = ({ player, stats, statusEffects, turn }: Props) => {
    const name = player === 'player1' ? 'Player 1' : 'Player 2'
    
    return (
        <div className={styles.container}>
            <div className={styles.shipContainer}>
                <div className={styles.topDiv}>
                    <div className={styles[`${player}Name`] + ' ' + styles.playerName}>{name}</div>
                    <div className={styles.shipUI}>
                        <span>HP:&nbsp;{stats.health} </span>
                        <span>Hull:&nbsp;{stats.hull}</span>
                    </div>       
                </div>
                <div className={styles.shipImageDiv}>
                    <img className={styles.shipImage} alt={`${name} Ship`} src={player === 'player2' ? '/images/ship_2_flipped.png' : '/images/ship_1.png'} />
                    <div id={`${player}-effects`} className={styles.effectsContainer}>
                        <div id={`${player}-damage-effects`} className={styles.effect}>
                            <Image width={200} height={200} alt={'red glow'} src={red_glow} objectFit={'cover'} />
                        </div>
                        <div id={`${player}-positive-effects`} className={styles.effect}>
                            <Image width={120} height={120} alt={'blue glow'} src={blue_glow} objectFit={'cover'} />
                        </div>
                    </div>
                </div>
                <div className={styles.resources}>
                    <Resource stats={stats} type={'defense'} />
                    <Resource stats={stats} type={'power'} />
                    <Resource stats={stats} type={'offense'} />
                </div>
            </div>
            <div className={styles.statusEffectsContainer}>
                    {statusEffects && Object.keys(statusEffects).map((e) =>
                        statusEffects[e].time > 0 && <div key={e} className={styles.statusIcon}><Image alt={`Status Effect ${e}`} src={statusIcons[e]} width={24} height={24} /></div>
                    )}
            </div>
            {/* <span className={styles.playerName}>{name}</span>
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
            </div> */}
        </div>
    )
}

export default ShipUI
