import React from "react";
import styles from "./RaceTree.module.css";
import { RaceTreeLight, RaceTreeLightColor } from "..";
interface RaceTreeProps {
  raceLight: number;
}

export const RaceTree: React.FC<RaceTreeProps> = ({ raceLight }) => {
  return (
    <div className={styles.raceTree}>
      <RaceTreeLight color={RaceTreeLightColor.RED} lit={raceLight === 0} />
      <RaceTreeLight color={RaceTreeLightColor.YELLOW} lit={raceLight === 1} />
      <RaceTreeLight color={RaceTreeLightColor.YELLOW} lit={raceLight === 2} />
      <RaceTreeLight color={RaceTreeLightColor.YELLOW} lit={raceLight === 3} />
      <RaceTreeLight color={RaceTreeLightColor.GREEN} lit={raceLight === 4} />
    </div>
  );
};
