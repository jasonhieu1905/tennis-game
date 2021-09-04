import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme
} from "@material-ui/core";
import { FC, useState } from "react";
import { getInitialGameState } from "../Game/GameReducer";
import { GameState } from "../Game/typings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      display: "flex",
      flexDirection: "column",
    },
  })
);

export const Registration: FC<{
  onRegisterSubmit: (gameState: GameState) => void;
}> = ({ onRegisterSubmit }) => {
  const classes = useStyles();
  const [player1Name, setPlayer1Name] = useState<string>("");
  const [player2Name, setPlayer2Name] = useState<string>("");

  const disabledGame = !player1Name || !player2Name;

  const registerPlayers = () => {
    const initialGameState = getInitialGameState(player1Name, player2Name);
    onRegisterSubmit(initialGameState);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h2>Please enter players's name before entering the game.</h2>
      <TextField
        defaultValue={player1Name}
        onChange={(event: any) => setPlayer1Name(event.target.value)}
        required
        label="Player1 Name"
        fullWidth
      />
      <TextField
        defaultValue={player2Name}
        onChange={(event: any) => setPlayer2Name(event.target.value)}
        required
        label="Player2 Name"
        fullWidth
      />
      <Button
        onClick={registerPlayers}
        disabled={disabledGame}
        variant="contained"
        color="primary"
      >
        Start Game
      </Button>
    </form>
  );
};

export default Registration;
