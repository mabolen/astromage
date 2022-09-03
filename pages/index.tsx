import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';
import { PlayerStats, CardObject } from '../src/types/types';
import { useState } from 'react';
import GameInstance from '../src/utils/gameInstance';

const Home: NextPage = () => {

  const gameInstance = new GameInstance()

  const [gameState, updateGameState] = useState(gameInstance.newGame())
  const [player1, updatePlayer1] = useState(gameInstance.newPlayer())
  const [player2, updatePlayer2] = useState(gameInstance.newPlayer())

  const startGame = (): void => updateGameState({...gameState, started: true})

  const playCard = (c: CardObject, p1: PlayerStats, p2: PlayerStats) => {
    if (gameState.turn === 1) {
      c.actions(p1, p2)
      updatePlayer1({...player1, stats: p1})
      updatePlayer2({...player2, stats: p2})
      updateGameState({...gameState, turn: 2})
    } else {
      c.actions(p2, p1)
      updatePlayer1({...player1, stats: p1})
      updatePlayer2({...player2, stats: p2})
      updateGameState({...gameState, turn: 1})
    }
  }

  const cards = player1.hand.map((c, i) => {
    if (i === 5) return
    return <div key={i} onClick={() => playCard(c, player1.stats, player2.stats)}>
              <Card card={c} key={i} ></Card>
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
          <button className={styles.button} onClick={()=> startGame()}>Start Game</button>
        </div> :
        <main className={styles.gameContainer}>
          <div className={styles.playerOneDiv}>
            <ResourceUi playerStats={player1.stats}></ResourceUi>
          </div>
          <div className={styles.shipOneDiv}>
            <Ship player='player1' stats={player1.stats}></Ship>
          </div>
          <div className={styles.playedCardsDiv}>
          </div>
          <div className={styles.gamePlayDiv}></div>
          <div className={styles.playerTwoDiv}>
            <ResourceUi playerStats={player2.stats}></ResourceUi>
          </div>
          <div className={styles.shipTwoDiv}>
            <Ship player='player2' stats={player2.stats}></Ship>
          </div>
          <div className={styles.playerHandDiv}>{cards}</div>
        </main> 
      }
    </>
  )
}

export default Home
