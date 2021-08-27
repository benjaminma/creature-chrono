import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
// import Creatures from "../data/sampleData.json";

const RACE_START_DELAY = 4500;

const RACE_MESSAGE_READY = "Ready to race?";
const RACE_MESSAGE_AGAIN = "Race again?";

function getRaceLightStyle(
  raceLight: number,
  state: number
): React.CSSProperties | undefined {
  return { display: raceLight === state ? "block" : "none" };
}

const Home: NextPage = () => {
  const [timerState, setTimerState] = React.useState(0);
  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [raceTime, setRaceTime] = React.useState(new Date().getTime());
  const [raceLight, setRaceLight] = React.useState(0);
  const [raceMessage, setRaceMessage] = React.useState(RACE_MESSAGE_READY);
  const [displayUnlit, setDisplayUnlit] = React.useState("0:00");
  const [displayUnlitMs, setDisplayUnlitMs] = React.useState(".00");
  const [displayLit, setDisplayLit] = React.useState("");
  const [displayLitMs, setDisplayLitMs] = React.useState("");
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { width, height } = useWindowSize();

  const handleStart = React.useCallback(
    (event) => {
      if (timerState === 0) {
        setTimerState(1);
        setStartTime(new Date().getTime());
        setRaceTime(new Date().getTime() + RACE_START_DELAY);
        setShowConfetti(false);
      } else {
        setTimerState(0);
        setRaceLight(0);

        // TODO: calculate race time
        // console.log(Creatures);
        setRaceMessage(RACE_MESSAGE_AGAIN);
        if (new Date().getTime() > raceTime) {
          setShowConfetti(true);
        }
      }
    },
    [timerState, raceTime]
  );
  React.useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (timerState === 1) {
      intervalId = setInterval(() => {
        const currTime = new Date().getTime();
        let diffTime = raceTime - currTime;

        if (raceTime > currTime) {
          if (diffTime <= 1000) {
            setRaceMessage("3... 2... 1...");
            setRaceLight(3);
          } else if (diffTime <= 2000) {
            setRaceMessage("3... 2...");
            setRaceLight(2);
          } else if (diffTime <= 3000) {
            setRaceMessage("3...");
            setRaceLight(1);
          } else {
            setRaceMessage("Ready...");
          }

          setDisplayUnlit("0:00");
          setDisplayUnlitMs(".00");
          setDisplayLit("");
          setDisplayLitMs("");
          return;
        }

        setRaceMessage("GO!!!");
        setRaceLight(4);

        diffTime = currTime - raceTime;
        const diffDate = new Date(diffTime);
        const m = diffDate.getMinutes().valueOf();
        const ss = diffDate.getSeconds().valueOf();
        const sss = diffDate
          .getMilliseconds()
          .toString()
          .padStart(3, "0")
          .substr(0, 2);
        let unlit = "";
        if (m === 0 && ss < 10) {
          unlit = "0:0";
        } else if (m === 0) {
          unlit = "0:";
        }
        setDisplayUnlit(unlit);
        setDisplayUnlitMs("");
        let lit;
        if (m > 0) {
          lit = `${m}:${ss.toString().padStart(2, "0")}`;
        } else {
          lit = `${ss}`;
        }
        setDisplayLit(lit);
        setDisplayLitMs(`.${sss}`);
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
          {/* <span></span>
          <a href="#">Race</a>
          <a href="#">Hi-Score</a>
          <a href="#">Settings</a> */}
        </div>
      </nav>

      <main className={styles.main}>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={40}
            gravity={0.11}
            colors={["cyan", "magenta", "yellow"]}
          />
        )}
        <div className={styles.racetimer} onClick={handleStart}>
          <span className={styles.racetimer_unlit}>{displayUnlit}</span>
          <span className={styles.racetimer_lit}>{displayLit}</span>
          <span className={styles.racetimer_unlit_sss}>{displayUnlitMs}</span>
          <span className={styles.racetimer_lit_sss}>{displayLitMs}</span>
        </div>

        <div className={styles.raceScreen}>
          <div className={styles.raceBanner} onClick={handleStart}>
            <div key={raceMessage} className={styles.raceMessage}>
              {raceMessage}
            </div>
          </div>

          <div className={styles.raceTree}>
            <div
              className={
                raceLight === 0 ? styles.raceTreeRedLit : styles.raceTreeRed
              }
            >
              00 00
            </div>
            <div
              className={
                raceLight === 1
                  ? styles.raceTreeYellowLit
                  : styles.raceTreeYellow
              }
            >
              00 00
            </div>
            <div
              className={
                raceLight === 2
                  ? styles.raceTreeYellowLit
                  : styles.raceTreeYellow
              }
            >
              00 00
            </div>
            <div
              className={
                raceLight === 3
                  ? styles.raceTreeYellowLit
                  : styles.raceTreeYellow
              }
            >
              00 00
            </div>
            <div
              className={
                raceLight === 4 ? styles.raceTreeGreenLit : styles.raceTreeGreen
              }
            >
              00 00
            </div>
          </div>
        </div>
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
