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
        <div className={`${styles.resourceDiv} ${styles[type]}`}>
            <div className={styles.imageDiv}>
                <div className={styles.replenishCount}><b>{productionAmount}</b></div>
                <Image width={64} height={64} alt={`${type} icon`} src={cardTypeIcons[type]}></Image>
            </div>
            <div className={styles.resourceCountDiv}>
                <span id={`${playerName}-${resMap[type]}`}>{amount}</span>
                <span>{capitalize(resMap[type])}</span>
            </div>
            <div id={`${playerName}-${prodTypeMap[type]}`} className={styles.resourceEffect}></div>
            <div id={`${playerName}-${prodTypeMap[type]}-down`} className={styles.resourceDownEffect}></div>
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
                amount={player.stats.ammunition}
                productionAmount={player.stats.ammunitionProd}
                type="offense"
                playerName={player.name}
            />
        </div>
    )
}

export default ResourceUi
