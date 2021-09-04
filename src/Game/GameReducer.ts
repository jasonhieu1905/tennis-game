import { GameState, GameStatus, Player, ScoreSteps } from "./typings";

export const getInitialGameState = (
  player1Name: string,
  player2Name: string
): GameState => {
  const player1: Player = {
    name: player1Name,
    score: ScoreSteps.Zero,
  };
  const player2: Player = {
    name: player2Name,
    score: ScoreSteps.Zero,
  };
  const defaultStatus: GameStatus = "score";

  const initialGameState = {
    player1,
    player2,
    status: defaultStatus,
  };
  return initialGameState;
};

export const addScoreReducer = (state: GameState, action: IncrementAction) => {
  switch (action.type) {
    case "increment":
      const playerNameHasIncrement = action.payload;
      const updatedState = getIncrementState(state, playerNameHasIncrement);

      return {
        ...state,
        ...updatedState,
      };
    case "reset":
      const player1Name = state.player1.name;
      const player2Name = state.player2.name;
      return getInitialGameState(player1Name, player2Name);
    default:
      return state;
  }
};

const getIncrementState = (
  state: GameState,
  updatedPlayerName: string
): GameState => {
  let { player1, player2, status = "score" } = state;
  const { name: player1Name } = player1;
  const { name: player2Name } = player2;

  if (player1Name === updatedPlayerName) {
    player1.score = getIncrementScore(player1.score, status);
  }

  if (player2Name === updatedPlayerName) {
    player2.score = getIncrementScore(player2.score, status);
  }

  if (hasDeuce(player1.score, player2.score)) {
    status = "deuce";
    player1.score = player2.score = ScoreSteps.Forty;
  }

  if (hasAdvantage(player1.score, player2.score)) {
    status = "advantage";
  }

  if (hasWinner(player1.score, player2.score)) {
    status = "end";
  }

  return {
    ...state,
    player1,
    player2,
    status,
  };
};

function hasDeuce(player1Score: ScoreSteps, player2Score: ScoreSteps) {
  return (
    (player1Score === ScoreSteps.Forty && player2Score === ScoreSteps.Forty) ||
    (player1Score === ScoreSteps.Advantage &&
      player2Score === ScoreSteps.Advantage)
  );
}

function hasAdvantage(player1Score: ScoreSteps, player2Score: ScoreSteps) {
  const player1Advantage =
    player1Score === ScoreSteps.Advantage && player2Score === ScoreSteps.Forty;
  const player2Advantage =
    player2Score === ScoreSteps.Advantage && player1Score === ScoreSteps.Forty;
  return player1Advantage || player2Advantage;
}

function hasWinner(player1Score: ScoreSteps, player2Score: ScoreSteps) {
  const player1Wins =
    (player1Score === ScoreSteps.Advantage &&
      player2Score !== ScoreSteps.Forty) ||
    player1Score === ScoreSteps.Win;
  const player2Wins =
    (player2Score === ScoreSteps.Advantage &&
      player1Score !== ScoreSteps.Forty) ||
    player2Score === ScoreSteps.Win;
  return player1Wins || player2Wins;
}

const getIncrementScore = (
  currentScoreStep: ScoreSteps,
  status: GameStatus
) => {
  switch (currentScoreStep) {
    case ScoreSteps.Zero:
      return ScoreSteps.Fifteen;
    case ScoreSteps.Fifteen:
      return ScoreSteps.Thirty;
    case ScoreSteps.Thirty:
      return ScoreSteps.Forty;
    case ScoreSteps.Forty:
      return ScoreSteps.Advantage;
    case ScoreSteps.Advantage:
      return ScoreSteps.Win;
    default:
      return ScoreSteps.Zero;
  }
};

export type IncrementAction =
  | {
      type: "increment";
      payload: string;
    }
  | {
      type: "reset";
    };
