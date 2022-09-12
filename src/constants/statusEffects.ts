import fire from '../../public/images/fireIcon.png'
import corrosion from '../../public/images/corrosionIcon.png'
import healing from '../../public/images/healingIcon.png'
import repairing from '../../public/images/repairIcon.png'
import noDefense from '../../public/images/defenseIcon.png'
import noPower from '../../public/images/powerIcon.png'
import noOffense from '../../public/images/offenseIcon.png'
import { StaticImageData } from 'next/image'

export const statusIcons: StatusIconsInterface = {
    fire: fire,
    corrosion: corrosion,
    healing: healing,
    repairing: repairing,
    noDefense: noDefense,
    noPower: noPower,
    noOffense: noOffense
}

interface StatusIconsInterface {
    [key: string]: StaticImageData
    fire: StaticImageData
    corrosion: StaticImageData
    healing: StaticImageData
    repairing: StaticImageData
    noDefense: StaticImageData
    noPower: StaticImageData
    noOffense: StaticImageData
}