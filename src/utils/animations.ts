import { Player } from "../types"
import { resNames, resProds } from "../constants"
import { AudioUtility } from "./audioUtils"

export class Animator {

    animateTime: number = 1500
    audio = new AudioUtility()

    async animatePlay(id: string) {
        const div = document.getElementById(id)!
        let xPos = div.getBoundingClientRect().x
    
        const topCenter = window.innerHeight / 2 - div.clientHeight / 2
        const leftCenter = window.innerWidth / 2 - (xPos + (div.clientWidth / 2))
        
        div.style.transform = `translate(${leftCenter}px,-${topCenter}px)`
        this.audio.playEffect(this.audio.effects.ghost)
        await this.animateTimer(this.animateTime)
    }

    async animateDraw(id: string) {
        const div = document.getElementById(id)!
        div.style.transform = 'translate(0,0)'
        await this.audio.playEffect(this.audio.effects.ghost)
        await this.animateTimer(this.animateTime)
    }

    async animateDiscard(id: string) {
        const div = document.getElementById(id)!
        const xPos = div.getBoundingClientRect().x
        const yPos = div.getBoundingClientRect().y
        const deck = document.getElementById('card-deck')!
        const {x, y} = deck.getBoundingClientRect()
        
        div.style.transform += `translate(${(x + deck.clientWidth * 1.2) - xPos}px,${y - yPos}px)`
        this.audio.playEffect(this.audio.effects.ghost)
        await this.animateTimer(this.animateTime)
    }

    async animateEffect(player: Player, playerRef: any) {
        const damDiv = document.getElementById(`${player.name}-damage-effects`)
        const posDiv = document.getElementById(`${player.name}-positive-effects`)
    
        const keyFrames = [
            { opacity: '0' },
            { opacity: '1' },
            { opacity: '0.5' },
            { opacity: '0.2' },
            { opacity: '0' }
        ]

        if (player.stats.hull < playerRef.current.hull || player.stats.health < playerRef.current.health) {
            damDiv && damDiv.animate(keyFrames, this.animateTime)
            this.audio.playEffect(this.audio.effects.explosion)
            await this.animateTimer(this.animateTime / 2)
        }
        if (player.stats.hull > playerRef.current.hull || player.stats.health > playerRef.current.health) {
            posDiv && posDiv.animate(keyFrames, this.animateTime)
            this.audio.playEffect(this.audio.effects.twinkle2)
            await this.animateTimer(this.animateTime / 2)
        }
    }

    async animateResourceCard(player: Player, playerRef: any) {
        const statsObj = {prods: [] as string[], prodsDown: [] as string[]}
        resProds.forEach(s => {
            if (player.stats[s] > playerRef.current[s]) statsObj.prods.push(s)
            if (player.stats[s] < playerRef.current[s]) statsObj.prodsDown.push(s)
        })

        const keyFrames = [
            {opacity: '0'},
            {opacity: '1'},
            {opacity: '1'},
            {opacity: '0'}
        ]

        statsObj.prods.forEach(r => {
            const div = document.getElementById(`${player.name}-${r}`)
            div && div.animate(keyFrames, this.animateTime)
            this.audio.playEffect(this.audio.effects.twinkle)
        })

        statsObj.prodsDown.forEach(r => {
            const div = document.getElementById(`${player.name}-${r}-down`)
            div && div.animate(keyFrames, this.animateTime)
            this.audio.playEffect(this.audio.effects.hit)
        })

        await this.animateTimer(this.animateTime)
    }

    async animateResource(player: Player, playerRef: any, activeCards: number[]) {
        const statsObj = {resources: [] as string[], resourcesDown: [] as string[]}
        // console.log('anim res', activeCards)
        // activeCards.forEach(c => {

        // })
        resNames.forEach(s => {
            if (player.stats[s] > playerRef.current[s]) {
                statsObj.resources.push(s)
            }
            activeCards.forEach(c => {
                if (player.stats[s] < playerRef.current[s] && (playerRef.current[s] - player.stats[s] !== player.hand[c].cost)) statsObj.resourcesDown.push(s)
            })
        })

        const resFrames = [
            {'color': '#fff'},
            {'color': '#00ff00'},
            {'color': '#00ff00'},
            {'color': '#fff'}
        ]

        const resDownFrames = [
            {'color': '#fff'},
            {'color': '#ff0000'},
            {'color': '#ff0000'},
            {'color': '#fff'}
        ]

        statsObj.resources.forEach(r => {
            const div = document.getElementById(`${player.name}-${r}`)
            div && div.animate(resFrames, this.animateTime)
            this.audio.playEffect(this.audio.effects.twinkle)
        })

        statsObj.resourcesDown.forEach(r => {
            const div = document.getElementById(`${player.name}-${r}`)
            div && div.animate(resDownFrames, this.animateTime)
            this.audio.playEffect(this.audio.effects.twinkle_down)
        })

        await this.animateTimer(this.animateTime)
    }

    animateTimer(time: number) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}