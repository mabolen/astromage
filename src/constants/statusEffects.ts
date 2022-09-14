// Packages
import { StaticImageData } from 'next/image'

// Constants
import corrosion from '../../public/images/corrosionIcon.png'
import healing from '../../public/images/healingIcon.png'
import fire from '../../public/images/fireIcon.png'
import noDefense from '../../public/images/defenseIcon.png'
import noOffense from '../../public/images/offenseIcon.png'
import noPower from '../../public/images/powerIcon.png'
import repairing from '../../public/images/repairIcon.png'

interface StatusIconsInterface {
    [key: string]: StaticImageData
    corrosion: StaticImageData
    healing: StaticImageData
    fire: StaticImageData
    noDefense: StaticImageData
    noOffense: StaticImageData
    noPower: StaticImageData
    repairing: StaticImageData
}

export const statusIcons: StatusIconsInterface = {
    corrosion,
    healing,
    fire,
    noDefense,
    noOffense,
    noPower,
    repairing,
}
