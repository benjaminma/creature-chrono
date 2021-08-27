import React from "react";

interface ICreatureJson {
  type: string;
  name: string;
  imageUrl: string;
  estMph: string;
  speed: string;
  height: string;
  weight: string;
}

interface ICreature {
  type: string;
  name: string;
  imageUrl: string;
  estMph: number;
  speed: number;
  height: number;
  weight: number;
}

export interface IRival extends ICreature {
  raceMph: number;
}

export type CreaturesContextType = {
  creatures: ICreature[];
  loadCreatures: Function;
  getRivalsByMph: Function;
};

export const CreaturesContext =
  React.createContext<CreaturesContextType | null>(null);

const calcRaceMph = (creature: ICreature) => {
  const simSpeed =
    (creature.estMph * (Math.random() * creature.speed)) / creature.speed;
  console.log(creature.name, simSpeed, creature.estMph);
  return simSpeed;
};

const CreaturesProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [creatures, setCreatures] = React.useState<ICreature[]>([]);

  // simulate a race, return creature faster than and slower than mph
  const getRivalsByMph = (mph: number) => {
    const racers = creatures
      ?.map((c) => ({
        name: c.name,
        type: c.type,
        imageUrl: c.imageUrl,
        estMph: c.estMph,
        raceMph: calcRaceMph(c),
        height: c.height,
        weight: c.weight,
      }))
      .sort((a, b) => {
        return a.raceMph - b.raceMph;
      });

    if (racers === undefined || racers.length === 0) return [null, null];

    let fasterThan = null;
    let slowerThan = null;

    for (let i = 0; i < racers?.length; i++) {
      if (mph > racers[i].raceMph) {
        fasterThan = racers[i];
      }
      if (mph < racers[i].raceMph) {
        slowerThan = racers[i];
        break;
      }
    }

    return [fasterThan, slowerThan];
  };

  const loadCreatures = (creaturesJson: ICreatureJson[]) => {
    const creatures: ICreature[] = creaturesJson
      .map((c) => ({
        type: c.type,
        name: c.name,
        imageUrl: c.imageUrl,
        estMph: Number(c.estMph),
        speed: Number(c.speed),
        height: Number(c.height),
        weight: Number(c.weight),
      }))
      .sort((a, b) => {
        return a.estMph - b.estMph;
      });
    setCreatures(creatures);
  };

  return (
    <CreaturesContext.Provider
      value={{ creatures, loadCreatures, getRivalsByMph }}
    >
      {children}
    </CreaturesContext.Provider>
  );
};
export default CreaturesProvider;
