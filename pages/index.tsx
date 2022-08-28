import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';
import { PlayerStats, CardObject } from '../src/types/types';
import { useState, useEffect } from 'react';
import Deck from '../src/utils/deck';

const Home: NextPage = () => {
  /* STATE TO TRACK
      - game started
      - turn
      - player stats
      - cards in hand
      - win conditions
  */
  const deck1 = new Deck().buildDeck()
  const deck2 = new Deck().buildDeck()

  const initialStats: PlayerStats = {
    material: 5,
    energy: 5,
    ammunition: 5,
    materialProd: 2,
    energyProd: 2,
    ammunitionProd: 2,
    health: 20,
    hull: 10
  }

  const gameState = {
    started: false,
    turn: 1,
    win: false,
    playerOne: {
        stats: initialStats,
        hand: deck1
    },
    playerTwo: {
        stats: initialStats,
        hand: deck2
    }
  }

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
        <div hidden={state.started} className={styles.startContainer}>
          <h1>AstroMage</h1>
          <button className={styles.button} onClick={()=> startGame()}>Start Game</button>
        </div> :
        <main hidden={!state.started} className={styles.gameContainer}>
          <div className={styles.playerOneDiv}>
            <ResourceUi></ResourceUi>
          </div>
          <div className={styles.shipOneDiv}>
            <Ship player='playerOne'></Ship>
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
