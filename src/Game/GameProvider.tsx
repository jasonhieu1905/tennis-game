import { createContext, FC, ReactNode, useContext } from "react";
import { GameState } from "./typings";

const GameContext = createContext<GameState>({} as GameState);

export function useGameContext() {
  return useContext(GameContext);
}

export const GameProvider: FC<{ gameState: GameState, children: ReactNode }> = ({
  gameState,
  children,
}) => {
  return <GameContext.Provider value={gameState}>{children}</GameContext.Provider>;
};
