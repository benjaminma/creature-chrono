import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Creature Chrono Racing Timer for Kids - How fast am I?</title>
        <meta
          name="description"
          content="Creature Chrono is a fun racing timer to measure how fast you are compared to Pokemon, Smash Bros., Insects, Dogs, and other various animals or Video Game creatures."
        />
      </Head>

      <nav className={styles.nav}>
        <div className={styles.navbar}>
          <a href="#" className={styles.navlogo}>
            creature-chrono
          </a>
          <a href="#">Race</a>
          {/* <a href="#">Hi-Score</a> */}
          <a href="#">Settings</a>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.racetimer}>
          <span className={styles.racetimer_unlit}>0:0</span>
          <span className={styles.racetimer_lit}>8.345</span>
        </div>

        <h1 className={styles.title}>Ready to race?</h1>
      </main>

      <footer className={styles.footer}>
        <div className={styles.btnshadow}>
          <button className={styles.btnstart}>Start</button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
