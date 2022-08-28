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
            <Image src={img} />
            <span>{card.name}</span>
            <span>{card.description}</span>
        </div>
    )
}

export default Card