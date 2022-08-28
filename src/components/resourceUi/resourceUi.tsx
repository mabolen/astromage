import styles from './resourceUi.module.css'
import power from '../../../public/images/power.png'
import defense from '../../../public/images/defense.png'
import offense from '../../../public/images/offense.png'
import Image from 'next/image'

const ResourceUi = () => {
    const resources = {
        materials: 5,
        energy: 5,
        ammunition: 5,
        defense: 2,
        power: 2,
        offense: 2
    }


    return (
        <div className={styles.uiContainer}>
            <div className={`${styles.resourceDiv} ${styles.defense}`}>
                <div className={styles.imageDiv}>
                    <div className={styles.replenishCount}><b>{resources.defense}</b></div>
                    <Image width={64} height={64} src={defense}></Image>
                </div>
                <div className={styles.resourceCountDiv}>
                    <span>{resources.materials}</span>
                    <span>Materials</span>
                </div>
            </div>
            <div className={`${styles.resourceDiv} ${styles.power}`}>
                <div className={styles.imageDiv}>
                    <div className={styles.replenishCount}><b>{resources.power}</b></div>
                    <Image width={64} height={64} src={power}></Image>
                </div>
                <div className={styles.resourceCountDiv}>
                    <span>{resources.energy}</span>
                    <span>Energy</span>
                </div>
            </div>
            <div className={`${styles.resourceDiv} ${styles.offense}`}>
                <div className={styles.imageDiv}>
                    <div className={styles.replenishCount}><b>{resources.offense}</b></div>
                    <Image width={64} height={64} src={offense}></Image>
                </div>
                <div className={styles.resourceCountDiv}>
                    <span>{resources.ammunition}</span>
                    <span>Ammunition</span>
                </div>
            </div>
        </div>
    )
}

export default ResourceUi