import styles from './card.module.css'
import Image from 'next/image'
import defense from '../../../public/images/defense.png'
import power from '../../../public/images/power.png'
import offense from '../../../public/images/offense.png'

const Card = (props: any) => {
    const { card } = props
    const img = card.type === 'defense' ? defense :
        card.type === 'power' ? power : offense
    return (
        <div className={`${styles[`${card.type}`]} ${styles.cardBody}`}>
            <span className={styles.titleSpan}>{card.name}</span>
            <div className={styles.imgDiv}>
                
            </div>
            <span className={styles.textSpan}>{card.description}</span>
            <div className={styles.cardIcon}>
                <Image width={20} height={20} src={img} />
            </div>
        </div>
    )
}

export default Card