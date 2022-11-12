// Packages
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';

// Components
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';

// Constants
import { resMap } from '../src/constants'

// Styles
import styles from '../styles/Home.module.css'

// Types
import { PlayerStats, CardObject, Player } from '../src/types';

// Utilities
import { GameInstance, Animator } from '../src/utils'
import { OpponentAI } from '../src/opponent/opponent-ai'

const Home: NextPage = () => {
  const gameInstance = new GameInstance()
  const animator = new Animator()
  const opponentAI = new OpponentAI()
  const [gameState, updateGameState] = useState(gameInstance.initialInstance)
  const [activeCards, setActiveCards] = useState<number[]>([])
  const [player1, updatePlayer1] = useState(gameInstance.newPlayer())
  const [player2, updatePlayer2] = useState(gameInstance.newPlayer())

  useEffect(() => {
    gameInstance.checkWin(gameState, player1, player2).then((res) => {
      res && updateGameState(res)
      if (gameState.turn === 2 && !gameState.win) {
        opponentRound()
      }
    })
  }, [gameState.turn])

  // Refs for triggering effects
  const player1Ref = useRef({...player1.stats})
  const player2Ref = useRef({...player2.stats})

  useEffect(() => {
    const refs = [{p: player1, r: player1Ref}, {p: player2, r: player2Ref}]
    refs.forEach(async el => {
      animator.animateEffect(el.p, el.r)
      animator.animateResourceCard(el.p, el.r)
      activeCards.length && animator.animateResource(el.p, el.r, activeCards)
      el.r.current = {...el.p.stats}
    })
  }, [Object.values(player1.stats), Object.values(player2.stats)])

  const startGame = (): void => {
    updatePlayer1({...gameInstance.newPlayer(), name: 'player1'})
    updatePlayer2({...gameInstance.newPlayer(), name: 'player2'})
    updateGameState(gameInstance.newGame())
  }

  const playCard = async (c: CardObject, p: Player, o: Player, i: number) => {
    setActiveCards([...activeCards, i])
    await gameInstance.playCard(c, p, o, i)
    updateStats()
    await gameInstance.discardCard(p, i)
    updateStats()
    gameState.turn === 2 && setActiveCards([])
    await animator.animateDraw(`card-${i}`)
    gameState.turn === 1 && setActiveCards([])
    endRound(p)
  }

  const handleDiscard = async (p: Player, i: number, e?: any) => {
    e && e.preventDefault()
    setActiveCards([...activeCards, i])
    await gameInstance.discardCard(p, i)
    updateStats()
    await animator.animateDraw(`card-${i}`)
    setActiveCards([])
    endRound(p)
  }

  const updateStats = () => {
    updatePlayer1({ ...player1 })
    updatePlayer2({ ...player2 })

    // const refs = [{p: player1, r: player1Ref}, {p: player2, r: player2Ref}]
    // refs.forEach(async el => {
    //   animator.animateEffect(el.p, el.r)
    //   animator.animateResourceCard(el.p, el.r)
    //   activeCards.length && animator.animateResource(el.p, el.r, activeCards)
    //   el.r.current = {...el.p.stats}
    // })
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
      <div className='card-container' key={i} onClick={(e) => (c.cost <= p.stats[resMap[c.type]] && !activeCards.length) && playCard(c, p, o, i)} onContextMenu={(e) => (!activeCards.length && gameState.turn !== 2) && handleDiscard(p, i, e)}>
        <Card card={c} stats={p.stats} turn={t} cardNum={i} active={activeCards}></Card>
      </div>
    )
  })

  return (
    <>
      <Head>
        <title>AstroMage</title>
      </Head>
      {!gameState.started && !gameState.win ?
        <div className={styles.startContainer}>
          <h1>AstroMage</h1>
          <button className={styles.button} onClick={() => startGame()}>Start Game</button>
        </div> :
        <main id='main' className={styles.gameContainer}>
          {/* <audio controls={false} autoPlay={true} loop={true}>
            <source src="audio/music/backbase.mp3" type="audio/mp3"/>
          </audio>  */}
          <div className={styles.playerOneDiv}>
            <ResourceUi player={player1}></ResourceUi>
          </div>
          <div className={styles.shipOneDiv}>
            <Ship player='player1' stats={player1.stats} statusEffects={player1.statusEffects} turn={gameState.turn}></Ship>
          </div>
          <div className={styles.playedCardsDiv}>
            <div id='card-deck' className={styles.cardDeck}>
              <div className={styles.cardDeck}><div className={styles.cardDeck}></div></div>
            </div>
          </div>
          <div className={styles.gamePlayDiv}></div>
          <div className={styles.playerTwoDiv}>
            <ResourceUi player={player2}></ResourceUi>
          </div>
          <div className={styles.shipTwoDiv}>
            <Ship player='player2' stats={player2.stats} statusEffects={player2.statusEffects} turn={gameState.turn}></Ship>
          </div>
          <div className={styles.playerHandDiv}>{gameState.turn === 1 ? cards(player1, player2, gameState.turn) : cards(player2, player1, gameState.turn)}</div>
        </main>
      }
      {gameState.win &&
        <div className={styles.winContainer}>
          <h1>{gameState.winner} WINS!</h1>
          <button className={styles.button} onClick={() => startGame()}>Start Game</button>
        </div>
      }
    </>
  )
}

export default Home
