import { Button, Grid, makeStyles, Theme } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { FC, useEffect, useReducer } from "react";
import { TENNIS_GAME_KEY } from "../constants";
import useLocalStorage from "../hooks/useLocalStorage";
import { PlayerCard } from "../Player/PlayerCard";
import { GameController } from "./GameController";
import { useGameContext } from "./GameProvider";
import { addScoreReducer, IncrementAction } from "./GameReducer";
import { GameStatus, Player } from "./typings";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  score: {
    backgroundColor: theme.palette.background.default,
    textAlign: "center",
  },
  status: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  player: {
    textAlign: "center",
  },
  addScore: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "center",
  },
}));

export const GameBoard: FC = () => {
  const classes = useStyles();
  const initialGameState = useGameContext();
  const [gameState, dispatch] = useReducer(addScoreReducer, initialGameState);
  const { status, player1, player2 } = gameState;
  const [, saveGameState] = useLocalStorage(TENNIS_GAME_KEY);

  const addScore = (name: string) => {
    dispatch({ type: "increment", payload: name });
  };

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState, saveGameState])

  return (
    <>
      <h3>Game</h3>
      <Grid container spacing={1}>
        <PlayerCard
          classes={classes}
          player={player1}
          status={status}
          isPrimaryColor={true}
        />
        <PlayerCard classes={classes} player={player2} status={status} />
        <GameStatusMessage
          classes={classes}
          status={status}
          player1={player1}
          player2={player2}
          dispatch={dispatch}
        />
        <GameController
          classes={classes}
          addScore={addScore}
          player1={player1}
          player2={player2}
          status={status}
        />
      </Grid>
    </>
  );
};

const GameStatusMessage: FC<{
  classes: ClassNameMap;
  status: GameStatus;
  player1: Player;
  player2: Player;
  dispatch: React.Dispatch<IncrementAction>;
}> = ({ classes, status, player1, player2, dispatch }) => {
  let message;
  if (status === "deuce") {
    message = <h2 className={classes.status}>Deuce</h2>;
  }
  if (status === "end") {
    const winnerPlayer = player1.score === "Win" ? player1.name : player2.name;
    message = (
      <>
        <h2 className={classes.status}>
          Game finished, congrats {winnerPlayer}
          <Button
            style={{marginLeft: '10px'}}
            onClick={() => dispatch({ type: "reset" })}
            variant="contained"
          >
            Reset the game
          </Button>
        </h2>
      </>
    );
  }
  return <>{message}</>;
};

export default GameBoard;
