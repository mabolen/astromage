import styles from './ship.module.css'
import ship from '../../../public/images/ship.png'
import ship2 from '../../../public/images/ship2.png'
import Image from 'next/image'
import { PlayerStats } from '../../types/types'

const Ship = (props: any) => {

    let player = props.player
    let stats: PlayerStats = props.stats

    return (
        <div className={styles.ship}>
            <span>Health: {stats.health}</span>
            <span>Hull: {stats.hull}</span>
            <Image width={200} height={200} src={player === 'player2' ? ship2 : ship}></Image>
        </div>
    )
}

export default Ship