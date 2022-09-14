import styles from './resourceUi.module.css'
import Image from 'next/image'
import { cardTypeIcons } from '../../constants/cardTypes'
import { resMap } from '../../constants/resourceNames'
import { CardType, PlayerStats } from '../../types/types'
import { capitalize } from '../../utils/stringUtils'

export type CardProps = {
    amount: number
    productionAmount: number
    type: CardType
}

const ResourceCard = ({ amount, productionAmount, type }: CardProps) => {
    return (
        <div className={`${styles.resourceDiv} ${styles.defense}`}>
            <div className={styles.imageDiv}>
                <div className={styles.replenishCount}><b>{productionAmount}</b></div>
                <Image width={64} height={64} alt={`${type} icon`} src={cardTypeIcons[type]}></Image>
            </div>
            <div className={styles.resourceCountDiv}>
                <span>{amount}</span>
                <span>{capitalize(resMap[type])}</span>
            </div>
        </div>
    )
}

export type UIProps = {
    playerStats: PlayerStats
}

const ResourceUi = ({ playerStats }: UIProps) => {
    return (
        <div className={styles.uiContainer}>
            <ResourceCard
                amount={playerStats.material}
                productionAmount={playerStats.materialProd}
                type="defense"
            />

            <ResourceCard
                amount={playerStats.energy}
                productionAmount={playerStats.energyProd}
                type="power"
            />

            <ResourceCard
                amount={playerStats.ammunition}
                productionAmount={playerStats.ammunitionProd}
                type="offense"
            />
        </div>
    )
}

export default ResourceUi
