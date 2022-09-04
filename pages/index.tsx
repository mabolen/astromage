import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';
import { PlayerStats, CardObject, Player } from '../src/types/types';
import { resMap } from '../src/constants/resourceNames';
import { useState } from 'react';
import GameInstance from '../src/utils/gameInstance';

const Home: NextPage = () => {

  const gameInstance = new GameInstance()

  const [gameState, updateGameState] = useState(gameInstance.newGame())
  const [player1, updatePlayer1] = useState(gameInstance.newPlayer())
  const [player2, updatePlayer2] = useState(gameInstance.newPlayer())

  const startGame = (event: any): void => {
    updateGameState({...gameState, started: true})
  }

  const playCard = (c: CardObject, p: Player, o: Player, index: number) => {
    c.actions(p.stats, o.stats)
    gameInstance.discardCard(p.hand, index)
    gameInstance.updateResources(p.stats)
    gameInstance.drawCard(p)
    endRound(player1.stats, player2.stats)
  }

  const handleDiscard = (hand: CardObject[], index: number, e: any) => {
    e.preventDefault()
    gameInstance.discardCard(hand, index)
    endRound(player1.stats, player2.stats)
  }

  const endRound = (p1: PlayerStats, p2: PlayerStats) => {
    updateGameState({...gameState, turn: gameState.turn === 1 ? 2 : 1})
    updatePlayer1({...player1, stats: p1})
    updatePlayer2({...player2, stats: p2})
  }

  const cards = (p: Player, o: Player) => p.hand.map((c, i) => {
    console.log(c)
    const clickable: boolean = c.cost <= p.stats[resMap[c.type]]
    if (i === 5) return
    return <div key={i} onClick={() => clickable ? playCard(c, p, o, i) : null} onContextMenu={(e) => handleDiscard(p.hand, i, e)}>
              <Card card={c} key={i} stats={p.stats} disabled={clickable}></Card>
          </div>
  })

  return (    
    <>
      <Head>
        <title>AstroMage</title>
      </Head>
      {!gameState.started ? 
        <div className={styles.startContainer}>
          <h1>AstroMage</h1>
          <button className={styles.button} onClick={(e)=> startGame(e)}>Start Game</button>
        </div> :
        <main className={styles.gameContainer}>
          <div className={styles.playerOneDiv}>
            <ResourceUi playerStats={player1.stats}></ResourceUi>
          </div>
          <div className={styles.shipOneDiv}>
            <Ship player='player1' stats={player1.stats}></Ship>
          </div>
          <div className={styles.playedCardsDiv}>
            {gameState.turn}
          </div>
          <div className={styles.gamePlayDiv}></div>
          <div className={styles.playerTwoDiv}>
            <ResourceUi playerStats={player2.stats}></ResourceUi>
          </div>
          <div className={styles.shipTwoDiv}>
            <Ship player='player2' stats={player2.stats}></Ship>
          </div>
          <div className={styles.playerHandDiv}>{gameState.turn === 1 ? cards(player1, player2): cards(player2, player1)}</div>
        </main> 
      }
    </>
  )
}

export default Home
