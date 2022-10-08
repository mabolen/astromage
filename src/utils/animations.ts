export const cardPlayTiming = {
    duration: 1500
}

export const animateCard = (id: string) => {
    const div = document.getElementById(id)!
    let xPos = div.getBoundingClientRect().x
    let yPos = div.getBoundingClientRect().y
    const deck = document.getElementById('card-deck')!
    const {x, y} = deck.getBoundingClientRect()

    const topCenter = window.innerHeight / 2 - div.clientHeight / 2
    const leftCenter = window.innerWidth / 2 - (xPos + (div.clientWidth / 2))

    const keyFrames = [
        { transform: 'translate(0,0)' },
        { transform: `translate(${leftCenter}px,-${topCenter}px)` },
        { transform: `translate(${(x + deck.clientWidth * 1.2) - xPos}px,${y - yPos}px)` }
    ];

    div.animate(keyFrames, cardPlayTiming)
}

export const animatePlay = (id: string) => {
    const div = document.getElementById(id)!
    let xPos = div.getBoundingClientRect().x
    let yPos = div.getBoundingClientRect().y
    const deck = document.getElementById('card-deck')!
    const {x, y} = deck.getBoundingClientRect()

    const topCenter = window.innerHeight / 2 - div.clientHeight / 2
    const leftCenter = window.innerWidth / 2 - (xPos + (div.clientWidth / 2))
    
    div.style.transform = `translate(${leftCenter}px,-${topCenter}px)`

    setTimeout(() => {
        xPos = div.getBoundingClientRect().x
        yPos = div.getBoundingClientRect().y
        div.style.transform += `translate(${(x + deck.clientWidth * 1.2) - xPos}px,${y - yPos}px)`
    }, cardPlayTiming. duration)
}

export const animateDraw = (id: string) => {
    const div = document.getElementById(id)!
    div.style.transform = 'translate(0,0)'
}

export class Animator {

    isAnimating: boolean = false
    animateTime: number = 1500

    animatePlay(id: string) {
        this.isAnimating = true
        const div = document.getElementById(id)!
        let xPos = div.getBoundingClientRect().x
        let yPos = div.getBoundingClientRect().y
        const deck = document.getElementById('card-deck')!
        const {x, y} = deck.getBoundingClientRect()
    
        const topCenter = window.innerHeight / 2 - div.clientHeight / 2
        const leftCenter = window.innerWidth / 2 - (xPos + (div.clientWidth / 2))
        
        div.style.transform = `translate(${leftCenter}px,-${topCenter}px)`
    
        setTimeout(() => {
            xPos = div.getBoundingClientRect().x
            yPos = div.getBoundingClientRect().y
            div.style.transform += `translate(${(x + deck.clientWidth * 1.2) - xPos}px,${y - yPos}px)`
            this.endAnimate()
        }, this.animateTime)
    }

    animateDraw(id: string) {
        this.isAnimating = true
        const div = document.getElementById(id)!
        div.style.transform = 'translate(0,0)'
        this.endAnimate()
    }

    animateDiscard(id: string) {
        this.isAnimating = true
        const div = document.getElementById(id)!
        let xPos = div.getBoundingClientRect().x
        let yPos = div.getBoundingClientRect().y
        const deck = document.getElementById('card-deck')!
        const {x, y} = deck.getBoundingClientRect()
        
        div.style.transform = `translate(${(x + deck.clientWidth * 1.2) - xPos}px,${y - yPos}px)`
        
        setTimeout(() => {
            div.style.transform = 'translate(0,0)'
            this.endAnimate()
        }, this.animateTime)
    }

    endAnimate() {
        setTimeout(() => {
            this.isAnimating = false
        }, this.animateTime)
    }

}