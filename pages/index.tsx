// Packages
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react';


// Components
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';

// Constants
import { resMap } from '../src/constants'

// Styles
import styles from '../styles/Home.module.css'

// Types
import { PlayerStats, CardObject, Player, ActiveCard } from '../src/types';

// Utilities
import { GameInstance } from '../src/utils';
import { OpponentAI } from '../src/opponent/opponent-ai';
import { cardPlayTiming, Animator } from '../src/utils/animations'

const Home: NextPage = () => {

  const gameInstance = new GameInstance()
  const animator = new Animator()
  const opponentAI = new OpponentAI()
  const [gameState, updateGameState] = useState(gameInstance.initialInstance)
  const [activeCards, setActiveCards] = useState<ActiveCard[]>([])
  const [player1, updatePlayer1] = useState(gameInstance.player)
  const [player2, updatePlayer2] = useState(gameInstance.player)

  const winCondition = (player: PlayerStats, opponent: PlayerStats): boolean => {
    const resourceWin = (player.energy || player.ammunition || player.material) >= 50
    return opponent.health <= 0 || resourceWin
  }

  useEffect((): void => {
    if (winCondition(player1.stats, player2.stats)) {
      console.log('Player 1 wins!')
      updateGameState({ ...gameState, started: false, win: true, winner: 'Player 1' })
    }
    if (winCondition(player2.stats, player1.stats)) {
      console.log('Player 2 wins!')
      updateGameState({ ...gameState, started: false, win: true, winner: 'Player 2' })
    }
  }, [player1, player2])

  useEffect((): void => {
    if (gameState.turn === 2) {
      opponentRound()
    }
  }, [gameState.turn])

  const startGame = (): void => {
    updatePlayer1(gameInstance.newPlayer())
    updatePlayer2(gameInstance.newPlayer())
    updateGameState(gameInstance.newGame())
  }

  const playCard = async (c: CardObject, p: Player, o: Player, index: number, id: string) => {
    const active: ActiveCard = {
      card: c,
      id: id
    }
    setActiveCards([...activeCards, active])
    animator.animatePlay(id)
    setTimeout(() => {
      gameInstance.playCard(c, p, o, index)
      gameState.turn === 2 && setActiveCards([...activeCards.slice(0, activeCards.length - 1)])
      animator.animateDraw(id)
      endRound(player1.stats, player2.stats)
    }, cardPlayTiming.duration * 2)
  }

  const handleDiscard = (p: Player, index: number, id: string, e?: any): void => {
    e && e.preventDefault()
    if (activeCards.length < 1) {
      animator.animateDiscard(id)
      setTimeout(() => {
        gameInstance.discardCard(p, index)
        endRound(player1.stats, player2.stats)
      }, animator.animateTime)
    }
  }

  const endRound = async (p1: PlayerStats, p2: PlayerStats) => {
    gameInstance.updateResources(gameState.turn === 1 ? p1 : p2)
    updatePlayer1({ ...player1, stats: p1 })
    updatePlayer2({ ...player2, stats: p2 })
    setTimeout( () => {
      updateGameState({ ...gameState, turn : gameState.turn === 1 ? 2: 1 })
      setActiveCards([...activeCards.slice(0, activeCards.length - 1)])
    }, animator.animateTime)
  }

  const opponentRound = () => {
    const result = opponentAI.playTurn(player2)
    if (result.action === 'play') {
      playCard(player2.hand[result.index], player2, player1, result.index, `card-${result.index}`)
    } else {
      handleDiscard(player2, result.index, `card-${result.index}`)
    }
  }

  const cards = (p: Player, o: Player, t: number) => p.hand.map((c: CardObject, i: number) => {
    return (
      <div className='card-container' key={i} onClick={(e) => (c.cost <= p.stats[resMap[c.type]] && activeCards.length < 1) && playCard(c, p, o, i, `card-${i}`)} onContextMenu={(e) => handleDiscard(p, i, `card-${i}`, e)}>
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
          <div className={styles.playerOneDiv}>
            <ResourceUi playerStats={player1.stats}></ResourceUi>
          </div>
          <div className={styles.shipOneDiv}>
            <Ship player='player1' stats={player1.stats} statusEffects={player1.statusEffects} turn={gameState.turn}></Ship>
          </div>
          <div className={styles.playedCardsDiv}>
            <div id='card-deck' className={styles.cardDeck}>
              <div className={styles.cardDeck}><div className={styles.cardDeck}></div></div>
            </div>
            {/* Player {gameState.turn}&apos;s Turn */}
          </div>
          <div className={styles.gamePlayDiv}></div>
          <div className={styles.playerTwoDiv}>
            <ResourceUi playerStats={player2.stats}></ResourceUi>
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
