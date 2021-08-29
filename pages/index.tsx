import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import useOrientation from "react-use/lib/useOrientation";
import creaturesJson from "../data/sampleData.json";
import {
  CreaturesContext,
  CreaturesContextType,
  IRival,
} from "../context/creaturesContext";
import Package from "../package.json";
import { RaceClock, RaceTree } from "../components";

const APP_TITLE = `creature-crono v${Package.version}`;
const RACE_START_DELAY = 5000;
const RACE_MESSAGE_READY = "Ready to race?";
const RACE_MESSAGE_AGAIN = "Race again?";

const getRaceMessage = (mph = 0, rivals: IRival[]) => {
  if (mph === 0) return RACE_MESSAGE_AGAIN;
  const [fasterThan, slowerThan] = rivals;
  console.log(mph, fasterThan, slowerThan);
  if (fasterThan) {
    return `${mph.toFixed(
      2
    )} MPH!! YOU BEAT ${fasterThan.name.toUpperCase()}!!!`;
  }
  return `${mph.toFixed(1)} MPH! GOOD JOB!`;
};

const Home: NextPage = () => {
  // load creatures from sample JSON
  const [creaturesJsonState] = React.useState(creaturesJson);
  const { loadCreatures, getRivalsByMph } = React.useContext(
    CreaturesContext
  ) as CreaturesContextType;
  React.useEffect(() => {
    loadCreatures(creaturesJson);
  }, [creaturesJsonState]);
  const [rivals, setRivals] = React.useState<IRival[]>([]);

  const [timerState, setTimerState] = React.useState(0);
  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [raceReady, setRaceReady] = React.useState(false);
  const [raceTime, setRaceTime] = React.useState(new Date().getTime());
  const [raceLight, setRaceLight] = React.useState(0);
  const [raceMessage, setRaceMessage] = React.useState(RACE_MESSAGE_READY);
  const [raceClockMinutes, setRaceClockMinutes] = React.useState(0);
  const [raceClockSeconds, setRaceClockSeconds] = React.useState(0);
  const [raceClockMs, setRaceClockMs] = React.useState(0);
  const [showConfetti, setShowConfetti] = React.useState(false);

  const orientation = useOrientation();
  const { width, height } = useWindowSize();
  React.useEffect(() => {
    setShowConfetti(false);
  }, [orientation, setShowConfetti]);

  const handleStart = React.useCallback(
    (event) => {
      if (timerState === 0) {
        setRaceReady(true);
        setRivals([]);
        setTimerState(1);
        setStartTime(new Date().getTime());
        setRaceTime(new Date().getTime() + RACE_START_DELAY);
        setShowConfetti(false);
      } else {
        setTimerState(0);
        setRaceLight(0);

        // calculate race time
        const stopTime = new Date().getTime();
        if (stopTime > raceTime) {
          const distance = 100;
          const elapsedMs = stopTime - raceTime;
          const fps = (distance / elapsedMs) * 1000;
          const mph = fps / 1.467;
          const rivals = getRivalsByMph(mph);
          setRivals(rivals);
          setRaceMessage(getRaceMessage(mph, rivals));
          setShowConfetti(true);
        } else {
          setRaceReady(false);
          setRaceMessage(RACE_MESSAGE_AGAIN);
        }
      }
    },
    [timerState, raceTime, getRivalsByMph]
  );
  React.useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (timerState === 1) {
      let isFirstInterval = true;
      intervalId = setInterval(() => {
        const currTime = new Date().getTime();
        let diffTime = raceTime - currTime;

        if (raceTime > currTime) {
          if (diffTime <= 500) {
            setRaceMessage("3... 2... 1...");
            setRaceLight(3);
          } else if (diffTime <= 1000) {
            setRaceMessage("3... 2...");
            setRaceLight(2);
          } else if (diffTime <= 1500) {
            setRaceMessage("3...");
            setRaceLight(1);
          } else {
            setRaceMessage("Standby.");
          }

          setRaceClockMinutes(0);
          setRaceClockSeconds(0);
          setRaceClockMs(0);
          return;
        }

        if (isFirstInterval) {
          isFirstInterval = false;
          setRaceMessage("GO!!!");
          setRaceLight(4);
        }

        diffTime = currTime - raceTime;
        const diffDate = new Date(diffTime);
        setRaceClockMinutes(diffDate.getMinutes());
        setRaceClockSeconds(diffDate.getSeconds());
        setRaceClockMs(diffDate.getMilliseconds());
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
            {APP_TITLE}
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
        <RaceClock
          isRaceReady={raceReady}
          minutes={raceClockMinutes}
          seconds={raceClockSeconds}
          ms={raceClockMs}
          onClick={handleStart}
        />

        <div className={styles.raceScreen}>
          <div className={styles.raceBanner} onClick={handleStart}>
            <div key={raceMessage} className={styles.raceMessage}>
              {raceMessage}
            </div>
            {rivals && rivals.length > 0 && rivals[0] !== null && (
              <img
                src={rivals[0].imageUrl}
                alt={`Picture of ${rivals[0].name}`}
              />
            )}
          </div>

          <RaceTree raceLight={raceLight} />
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
