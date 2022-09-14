// Packages
import { StaticImageData } from 'next/image'

// Constants
import defense from '../../public/images/defense.png'
import offense from '../../public/images/offense.png'
import power from '../../public/images/power.png'

interface CardTypeIconsInterface {
    defense: StaticImageData
    offense: StaticImageData
    power: StaticImageData
}

export const cardTypeIcons: CardTypeIconsInterface = {
    defense,
    offense,
    power
}
