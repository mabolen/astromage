// Packages
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

// Components
import Card from '../src/components/card/card'
import Ship from '../src/components/ship/ship'

// Constants
import { resMap } from '../src/constants'

// Styles
import styles from '../styles/Home.module.css'

// Types
import { PlayerStats, CardObject, Player } from '../src/types'

// Utilities
import { GameInstance, Animator } from '../src/utils'
import { OpponentAI } from '../src/opponent/opponent-ai'

const Home: NextPage = () => {
  // Utility Classes
  const gameInstance = new GameInstance()
  const opponentAI = new OpponentAI()

  const [gameState, updateGameState] = useState(gameInstance.initialInstance)
  const [activeCards, setActiveCards] = useState<number[]>([])
  const [player1, updatePlayer1] = useState(gameInstance.newPlayer())
  const [player2, updatePlayer2] = useState(gameInstance.newPlayer())

  useEffect(() => {
    const checkWin = gameInstance.checkWin(gameState, player1, player2)
    updateGameState(checkWin)
    if (gameState.turn === 2 && !gameState.win) {
      opponentRound()
    }
  }, [gameState.turn])

  // Refs for triggering effects
  const player1Ref = useRef({...player1.stats})
  const player2Ref = useRef({...player2.stats})

  // For playing animations and sounds
  useEffect(() => {
    const refs = [{p: player1, r: player1Ref}, {p: player2, r: player2Ref}]
    refs.forEach(el => {
      try {
        !gameState.win && gameInstance.animator.animateEffect(el.p, el.r)
        !gameState.win && gameInstance.animator.animateResourceCard(el.p, el.r)
        // We want animations/sounds to play only when resources are changed by a card's action, not from resource production or cost
        activeCards.length && gameInstance.animator.animateResource(el.p, el.r, activeCards)
      } catch(error) {
        console.log(error)
      }

      el.r.current = {...el.p.stats}
    })
  }, [Object.values(player1.stats), Object.values(player2.stats)])

  // Game Actions
  const startGame = (): void => {
    updatePlayer1({...gameInstance.newPlayer(), name: 'player1'})
    updatePlayer2({...gameInstance.newPlayer(), name: 'player2'})
    player1Ref.current = {...player1.stats}
    player2Ref.current = {...player2.stats}
    setTimeout(() => {
      updateGameState(gameInstance.newGame())
    }, 10)
  }

  const playCard = async (c: CardObject, p: Player, o: Player, i: number) => {
    setActiveCards([...activeCards, i])
    await gameInstance.playCard(c, p, o, i)
    updateStats()
    await gameInstance.discardCard(p, i)
    updateStats()
    gameState.turn === 2 && setActiveCards([-1])
    
    try {
      await gameInstance.animator.animateDraw(`card-${i}`)
    } catch (err) {
      console.log(err)
    }
    
    setActiveCards([])
    endRound(p)
  }

  const touchStartRef = useRef(null)
  const touchEndRef = useRef(null)

  const cardTouchStart = (e: any) => {
    touchEndRef.current = null
    touchStartRef.current = e.targetTouches[0].clientY
  }

  const cardTouchMove = (e: any) => {
    touchEndRef.current = e.targetTouches[0].clientY
  }

  const cardTouchEnd = (p: Player, i: number, e?: any) => {
    if (!touchStartRef.current || !touchEndRef.current) return
    if ((touchStartRef.current - touchEndRef.current) > 100) {
      (!activeCards.length && gameState.turn !== 2) && handleDiscard(p, i, e)
    }
  }

  const handleDiscard = async (p: Player, i: number, e?: any) => {
    e && e.preventDefault()
    setActiveCards([...activeCards, i])
    await gameInstance.discardCard(p, i)
    updateStats()
    try {
      await gameInstance.animator.animateDraw(`card-${i}`)
    } catch(error) {
      console.log(error)
    }
    setActiveCards([])
    endRound(p)
  }

  const updateStats = () => {
    updatePlayer1({ ...player1 })
    updatePlayer2({ ...player2 })
  }

  const endRound = async (p: Player) => {
    setActiveCards([])
    gameInstance.statusHandler(p)
    gameInstance.updateResources(p.stats)
    updateStats()
    updateGameState({ ...gameState, turn : gameState.turn === 1 ? 2: 1 })
  }

  const opponentRound = () => {
    const { action, index } = opponentAI.playTurn(player2, player1)
    if (action === 'play') {
      playCard(player2.hand[index], player2, player1, index)
    } else {
      handleDiscard(player2, index)
    }
  }

  const cards = (p: Player, o: Player, t: number) => p.hand.map((c: CardObject, i: number) => {
    return (
      <div className='card-container'
        key={i}
        onClick={(e) => (c.cost <= p.stats[resMap[c.type]] && !activeCards.length) && playCard(c, p, o, i)}
        onContextMenu={(e) => (!activeCards.length && gameState.turn !== 2) && handleDiscard(p, i, e)}
        onTouchStart={(e) => cardTouchStart(e)}
        onTouchMove={(e) => cardTouchMove(e)}
        onTouchEnd={(e) => cardTouchEnd(p, i, e)}
      >
        <Card card={c} stats={p.stats} turn={t} cardNum={i} active={activeCards}></Card>
      </div>
    )
  })

  return (
    <>
      <Head>
        <title>AstroMage</title>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></meta> */}
      </Head>
      {!gameState.started && !gameState.win ?
        <div className={styles.startContainer}>
          <h1>Welcome to AstroMage!</h1>
          <div>
            <h3>How to play:</h3>
            <p>Each turn you may play or discard a card. <br />Click or tap a card to play it. Right-click or swipe up to discard.</p>
            <p>
              There are 3 resource types: Material, Energy, and Ammo.<br />
              Each corresponds to a production stat: Defense, Power, Offense. <br />
              You must have enough of a resource to play a card. <br />
              You will replenish a resource by the production stat at the end of each turn.
            </p>
            <p>You can win by destroying the enemy ship, or getting any resource/stat to 50.</p>
            
          </div>
          <button className={styles.button} onClick={() => startGame()}>Start Game</button>
        </div> :
        <main id='main' className={styles.gameContainer}>
          <audio controls={false} autoPlay={true} loop={true}>
            <source src="audio/music/backbase.mp3" type="audio/mp3"/>
          </audio> 

          <div className={styles.shipOneDiv}>
            <Ship player='player1' stats={player1.stats} statusEffects={player1.statusEffects} turn={gameState.turn} />
          </div>

          <div className={styles.playedCardsDiv}>
            <div id='card-deck' className={styles.cardDeck}>
              <div className={styles.cardDeck}><div className={styles.cardDeck}></div></div>
            </div>
          </div>
          <div className={styles.gamePlayDiv}></div>

          <div className={styles.shipTwoDiv}>
            <Ship player='player2' stats={player2.stats} statusEffects={player2.statusEffects} turn={gameState.turn} />
          </div>

          <div className={styles.handContainer}>
            <div className={styles.playerHandDiv}>
              {gameState.turn === 1 ? cards(player1, player2, gameState.turn) : cards(player2, player1, gameState.turn)}
            </div>
          </div>

        </main>
      }
      {gameState.win &&
        <div className={styles.winContainer}>
          <h1>{gameState.winner !== 'Draw' ? gameState.winner + ' WINS!' : 'It\'s a ' + gameState.winner + '!'}</h1>
          <button className={styles.button} onClick={() => startGame()}>Start Game</button>
        </div>
      }
    </>
  )
}

export default Home
