import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';
import { PlayerStats, CardObject } from '../src/types/types';
import { useState, useEffect } from 'react';
import Deck from '../src/utils/deck';
import GameInstance from '../src/utils/gameInstance';

const Home: NextPage = () => {
  /* STATE TO TRACK
      - game started
      - turn
      - player stats
      - cards in hand
      - win conditions
  */
  const gameInstance = new GameInstance()
  const deck1 = new Deck().buildDeck()
  const deck2 = new Deck().buildDeck()

  const gameState = gameInstance.newGame()

  const [state, updateState] = useState(gameState)

  const startGame = (): void => {
    updateState({...state, started: true})
  }

  const cards = state.playerOne.hand.map((c, i) => {
    return <Card card={c} key={i}></Card>
  })

  return (    
    <>
      <Head>
        <title>AstroMage</title>
      </Head>
      {!state.started ? 
        <div className={styles.startContainer}>
          <h1>AstroMage</h1>
          <button className={styles.button} onClick={()=> startGame()}>Start Game</button>
        </div> :
        <main className={styles.gameContainer}>
          <div className={styles.playerOneDiv}>
            <ResourceUi></ResourceUi>
          </div>
          <div className={styles.shipOneDiv}>
            <Ship player='playerOne'></Ship>
          </div>
          <div className={styles.playedCardsDiv}>
            <Card card={state.playerOne.hand[0]}></Card>
          </div>
          <div className={styles.gamePlayDiv}></div>
          <div className={styles.playerTwoDiv}>
            <ResourceUi></ResourceUi>
          </div>
          <div className={styles.shipTwoDiv}>
            <Ship player='playerTwo'></Ship>
          </div>
          <div className={styles.playerHandDiv}>{cards}</div>
        </main> 
      }
    </>
  )
}

export default Home
