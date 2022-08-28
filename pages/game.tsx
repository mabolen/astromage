import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/game.module.css'
import Card from '../src/components/card/card';
import ResourceUi from '../src/components/resourceUi/resourceUi';
import Ship from '../src/components/ship/ship';

export default function Game() {
    return (    
        <>
            <Head>
                <title>AstroMage</title>
            </Head>
            <main className={styles.gameContainer}>
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
                <div className={styles.playerHandDiv}>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
            </main>
        </>
    )
}
  