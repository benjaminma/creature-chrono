import React from "react";
import styles from "./RaceTreeLight.module.css";

export enum RaceTreeLightColor {
  RED,
  YELLOW,
  GREEN,
}

interface RaceTreeLightProps {
  color: RaceTreeLightColor;
  lit: boolean;
}

const getRaceTreeLightStyle = (
  color: RaceTreeLightColor,
  lit: boolean
): string => {
  if (color === RaceTreeLightColor.RED) {
    return lit ? styles.raceTreeRedLit : styles.raceTreeRed;
  } else if (color === RaceTreeLightColor.YELLOW) {
    return lit ? styles.raceTreeYellowLit : styles.raceTreeYellow;
  } else if (color === RaceTreeLightColor.GREEN) {
    return lit ? styles.raceTreeGreenLit : styles.raceTreeGreen;
  }
  return "";
};

export const RaceTreeLight: React.FC<RaceTreeLightProps> = ({ color, lit }) => {
  return <div className={getRaceTreeLightStyle(color, lit)}>00 00</div>;
};
