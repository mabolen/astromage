// Packages
import Image from 'next/image'

// Constants
import { cardTypeIcons, resMap } from '../../constants'

// Styles
import styles from './card.module.css'

// Types
import { PlayerStats, CardObject } from '../../types'

export type Props = {
    card: CardObject
    stats: PlayerStats
}

const Card = ({ card, stats }: Props) => {
    const disabled = card.cost > stats[resMap[card.type]]
    const img = cardTypeIcons[card.type]

    return (
        <div className={`${styles[`${card.type}`]} ${styles.cardBody}`}>
            <div hidden={!disabled} className={styles.disabled}></div>
            <span className={styles.titleSpan}>{card.name}</span>
            <div className={styles.imgDiv}>

            </div>
            <span className={styles.textSpan}>{card.description}</span>
            <span className={styles.cardCost}>{card.cost}</span>
            <div className={styles.cardIcon}>
                <Image width={20} height={20} alt={`${card.type} icon`} src={img} />
            </div>
        </div>
    )
}

export default Card
