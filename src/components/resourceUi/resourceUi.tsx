import styles from './resourceUi.module.css'
import power from '../../../public/images/power.png'
import defense from '../../../public/images/defense.png'
import offense from '../../../public/images/offense.png'
import Image from 'next/image'
import { PlayerStats } from '../../types/types'

const ResourceUi = (props: any) => {
    const resources: PlayerStats = props.playerStats


    return (
        <div className={styles.uiContainer}>
            <div className={`${styles.resourceDiv} ${styles.defense}`}>
                <div className={styles.imageDiv}>
                    <div className={styles.replenishCount}><b>{resources.materialProd}</b></div>
                    <Image width={64} height={64} src={defense}></Image>
                </div>
                <div className={styles.resourceCountDiv}>
                    <span>{resources.material}</span>
                    <span>Materials</span>
                </div>
            </div>
            <div className={`${styles.resourceDiv} ${styles.power}`}>
                <div className={styles.imageDiv}>
                    <div className={styles.replenishCount}><b>{resources.energyProd}</b></div>
                    <Image width={64} height={64} src={power}></Image>
                </div>
                <div className={styles.resourceCountDiv}>
                    <span>{resources.energy}</span>
                    <span>Energy</span>
                </div>
            </div>
            <div className={`${styles.resourceDiv} ${styles.offense}`}>
                <div className={styles.imageDiv}>
                    <div className={styles.replenishCount}><b>{resources.ammunitionProd}</b></div>
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