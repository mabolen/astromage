import styles from './ship.module.css'
import ship from '../../../public/images/ship.png'
import Image from 'next/image'

const Ship = (props: any) => {

    let player = props.player

    return (
        <div className={styles[`${player}`]}>
            <Image width={200} height={200} src={ship}></Image>
        </div>
    )
}

export default Ship