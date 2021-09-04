export enum ScoreSteps {
  Zero = "0",
  Fifteen = "15",
  Thirty = "30",
  Forty = "40",
  Advantage = "Advantage",
  Win = 'Win',
}
export type GameStatus = "score" | "deuce" | "advantage" | 'end';

export interface Player { 
  name: string;
  score: ScoreSteps;
}

export interface GameState {
  player1: Player;
  player2: Player;
  status: GameStatus;
  winnerPlayer?: string;
}
