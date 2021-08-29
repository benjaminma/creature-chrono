import React from "react";
import styles from "./RaceClock.module.css";

interface ReactClockProps {
  isRaceReady: boolean;
  minutes: number;
  seconds: number;
  ms: number;
  onClick: (event: any) => void;
}

const resetClockRaceOff = ["0:00", "", ".00", ""];
const resetClockRaceOn = ["0:0", "0", "", ".00"];
const getDisplayParts = (
  isRaceReady: boolean,
  minutes: number,
  seconds: number,
  ms: number
) => {
  if (minutes === 0 && seconds === 0 && ms === 0) {
    return isRaceReady ? resetClockRaceOn : resetClockRaceOff;
  }

  let unlit = "";
  let unlitMs = "";
  let lit = "";
  let litMs = "";
  ms = Math.floor(ms / 10);

  if (minutes === 0) {
    if (seconds < 10) {
      unlit = "0:0";
      lit = seconds.toString();
    } else {
      unlit = "0:";
      lit = seconds.toString();
    }
  } else {
    lit = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  litMs = `.${ms.toString().padStart(2, "0")}`;

  return [unlit, lit, unlitMs, litMs];
};

export const RaceClock: React.FC<ReactClockProps> = ({
  isRaceReady,
  minutes,
  seconds,
  ms,
  onClick,
}) => {
  const [displayUnlit, displayLit, displayUnlitMs, displayLitMs] =
    getDisplayParts(isRaceReady, minutes, seconds, ms);

  return (
    <div className={styles.racetimer} onClick={onClick}>
      <span className={styles.racetimer_unlit}>{displayUnlit}</span>
      <span className={styles.racetimer_lit}>{displayLit}</span>
      <span className={styles.racetimer_unlit_sss}>{displayUnlitMs}</span>
      <span className={styles.racetimer_lit_sss}>{displayLitMs}</span>
    </div>
  );
};
