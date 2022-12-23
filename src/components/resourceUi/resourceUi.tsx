// Packages
import Image from 'next/image'

// Constants
import { cardTypeIcons, resMap, prodTypeMap } from '../../constants'

// Styles
import styles from './resourceUi.module.css'

// Types
import { CardType, Player } from '../../types'

// Utilities
import { capitalize } from '../../utils'

export type CardProps = {
    amount: number
    productionAmount: number
    type: CardType
    playerName: string
}

const ResourceCard = ({ amount, productionAmount, type, playerName }: CardProps) => {
    return (
        <div id={`${playerName}-${prodTypeMap[type]}`} className={`${styles.resourceDiv} ${styles[type]}`}>
            <div className={styles.imageDiv}>
                <div className={styles.replenishCount}><b>{productionAmount}</b></div>
                <div className={styles.imgContainer}>
                    <Image alt={`${type} icon`} src={cardTypeIcons[type]} objectFit={'cover'} />  
                </div>
                
            </div>
            <div className={styles.resourceCountDiv}>
                <span id={`${playerName}-${resMap[type]}`}>{amount}</span>
                <span className={styles.resType}>{capitalize(resMap[type])}</span>
            </div>
        </div>
    )
}

export type UIProps = {
    player: Player
}

const ResourceUi = ({ player }: UIProps) => {
    return (
        <div className={styles.uiContainer}>
            <ResourceCard
                amount={player.stats.material}
                productionAmount={player.stats.materialProd}
                type="defense"
                playerName={player.name}
            />

            <ResourceCard
                amount={player.stats.energy}
                productionAmount={player.stats.energyProd}
                type="power"
                playerName={player.name}
            />

            <ResourceCard
                amount={player.stats.ammo}
                productionAmount={player.stats.ammoProd}
                type="offense"
                playerName={player.name}
            />
        </div>
    )
}

export default ResourceUi
