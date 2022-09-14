import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';
import { PlayerStats, CardObject, Player } from '../src/types/types';
import { resMap } from '../src/constants/resourceNames';
import { useState, useEffect } from 'react';
import GameInstance from '../src/utils/gameInstance';

const Home: NextPage = () => {

  const gameInstance = new GameInstance()
  const [gameState, updateGameState] = useState(gameInstance.initialInstance)
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

  const startGame = (): void => {
    updatePlayer1(gameInstance.newPlayer())
    updatePlayer2(gameInstance.newPlayer())
    updateGameState(gameInstance.newGame())
  }

  const playCard = (c: CardObject, p: Player, o: Player, index: number): void => {
    c.actions(p.stats, o.stats)
    p.stats[resMap[c.type]] -= c.cost
    gameInstance.discardCard(p, index)
    endRound(player1.stats, player2.stats)
  }

  const handleDiscard = (p: Player, index: number, e: any): void => {
    e.preventDefault()
    gameInstance.discardCard(p, index)
    endRound(player1.stats, player2.stats)
  }

  const endRound = (p1: PlayerStats, p2: PlayerStats): void => {
    gameInstance.updateResources(gameState.turn === 1 ? p1 : p2)
    updatePlayer1({ ...player1, stats: p1 })
    updatePlayer2({ ...player2, stats: p2 })
    updateGameState({ ...gameState, turn: gameState.turn === 1 ? 2 : 1 })
  }

  const cards = (p: Player, o: Player) => p.hand.map((c: CardObject, i: number) => {
    if (i === 5) return
    return <div key={i} onClick={() => c.cost <= p.stats[resMap[c.type]] ? playCard(c, p, o, i) : null} onContextMenu={(e) => handleDiscard(p, i, e)}>
      <Card card={c} key={i} stats={p.stats}></Card>
    </div>
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
        <main className={styles.gameContainer}>
          <div className={styles.playerOneDiv}>
            <ResourceUi playerStats={player1.stats}></ResourceUi>
          </div>
          <div className={styles.shipOneDiv}>
            <Ship player='player1' stats={player1.stats} statusEffects={player1.statusEffects}></Ship>
          </div>
          <div className={styles.playedCardsDiv}>
            {gameState.turn}
          </div>
          <div className={styles.gamePlayDiv}></div>
          <div className={styles.playerTwoDiv}>
            <ResourceUi playerStats={player2.stats}></ResourceUi>
          </div>
          <div className={styles.shipTwoDiv}>
            <Ship player='player2' stats={player2.stats} statusEffects={player2.statusEffects}></Ship>
          </div>
          <div className={styles.playerHandDiv}>{gameState.turn === 1 ? cards(player1, player2) : cards(player2, player1)}</div>
        </main>
      }
      {gameState.win ?
        <div className={styles.winContainer}>
          <h1>{gameState.winner} WINS!</h1>
          <button className={styles.button} onClick={() => startGame()}>Start Game</button>
        </div> : null}
    </>
  )
}

export default Home
