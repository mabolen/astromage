export class AudioUtility {
    music = new Audio('audio/music/backchill.mp3')

    effects = {
        quickBlast: 'audio/sounds/quick_blast.mp3',
        explosion: 'audio/sounds/explosion.mp3',
        error: 'audio/sounds/error.mp3',
        ghost: 'audio/sounds/ghost.mp3',
        woosh: 'audio/sounds/woosh_up.mp3',
        twinkle: 'audio/sounds/twinkle_fast3.mp3',
        twinkle2: 'audio/sounds/reverb_twinkle.mp3',
        twinkle_down: 'audio/sounds/twinkle_down_fast.mp3',
        hit: 'audio/sounds/glass_hit.mp3',
        danger: 'audio/sounds/danger.mp3',
        alarm: 'audio/sounds/alarm.mp3'
    }

    async playEffect(src: string) {
        const audioPlayer = new Audio()
        audioPlayer.src = src
        await audioPlayer.play()
    }
}