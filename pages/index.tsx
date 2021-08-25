import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
// import Image from "next/image";
import styles from "../styles/Home.module.css";

function getRaceMessage(timerState: number, raceTime: number): string {
  if (timerState === 0) {
    return "Ready to race?";
  }

  const currTime = new Date().getTime();
  if (currTime > raceTime) {
    return "GO!!!";
  }
  const diffTime = currTime - raceTime;
  if (diffTime <= 1000) return "3";
  else if (diffTime <= 2000) {
    return "2";
  }
  return "1";
}
const countdownMessage = "3... 2... 1...";
const Home: NextPage = () => {
  const [timerState, setTimerState] = React.useState(0);
  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [raceTime, setRaceTime] = React.useState(new Date().getTime());
  const [raceMessage, setRaceMessage] = React.useState("Ready to race?");
  const [displayUnlit, setDisplayUnlit] = React.useState("0:00.000");
  const [displayLit, setDisplayLit] = React.useState("");
  const handleStart = React.useCallback(
    (event) => {
      if (timerState === 0) {
        setTimerState(1);
        setStartTime(new Date().getTime());
        setRaceTime(new Date().getTime() + 3000);
      } else {
        setTimerState(0);
        setRaceMessage("Race again?");
      }
    },
    [timerState]
  );
  React.useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (timerState === 1) {
      intervalId = setInterval(() => {
        const currTime = new Date().getTime();
        let diffTime = raceTime - currTime;

        if (raceTime > currTime) {
          if (diffTime <= 3000) {
            setRaceMessage(
              countdownMessage.substr(
                0,
                ((3300 - diffTime) / 3000) * countdownMessage.length
              )
            );
          }
          setDisplayUnlit("0:00.000");
          setDisplayLit("");
          return;
        }

        setRaceMessage("GO!!!");

        diffTime = currTime - raceTime;
        const diffDate = new Date(diffTime);
        const m = diffDate.getMinutes().valueOf();
        const ss = diffDate.getSeconds().valueOf();
        const sss = diffDate.getMilliseconds().toString().padStart(3, "0");
        let unlit = "";
        if (m === 0 && ss < 10) {
          unlit = "0:0";
        } else if (m === 0) {
          unlit = "0:";
        }
        setDisplayUnlit(unlit);
        let lit;
        if (m > 0) {
          lit = `${m}:${ss.toString().padStart(2, "0")}.${sss}`;
        } else {
          lit = `${ss}.${sss}`;
        }
        setDisplayLit(lit);
      }, 33);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerState, startTime, raceTime]);

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
          <span></span>
          <a href="#">Race</a>
          {/* <a href="#">Hi-Score</a> */}
          <a href="#">Settings</a>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.racetimer}>
          <span className={styles.racetimer_unlit}>{displayUnlit}</span>
          <span className={styles.racetimer_lit}>{displayLit}</span>
        </div>

        <h1 className={styles.title}>{raceMessage}</h1>
      </main>

      <footer className={styles.footer}>
        <div className={styles.btnshadow}>
          <button className={styles.btnstart} onClick={handleStart}>
            {timerState === 0 ? "Start" : "Stop"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
