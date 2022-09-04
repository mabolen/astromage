import styles from './card.module.css'
import Image from 'next/image'
import defense from '../../../public/images/defense.png'
import power from '../../../public/images/power.png'
import offense from '../../../public/images/offense.png'
import { PlayerStats, CardObject } from '../../types/types'

const Card = (props: any) => {
    const card: CardObject = props.card
    const stats: PlayerStats = props.stats
    const disabled: boolean = props.disabled
     
    const img = card.type === 'defense' ? defense :
        card.type === 'power' ? power : offense
    return (
        <div className={`${styles[`${card.type}`]} ${styles.cardBody}`}>
            <div hidden={disabled} className={styles.disabled}></div>
            <span className={styles.titleSpan}>{card.name}</span>
            <div className={styles.imgDiv}>
                
            </div>
            <span className={styles.textSpan}>{card.description}</span>
            <span className={styles.cardCost}>{card.cost}</span>
            <div className={styles.cardIcon}>
                <Image width={20} height={20} src={img} />
            </div>
        </div>
    )
}

export default Card