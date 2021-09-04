import { Button, Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { FC } from "react";
import { GameStatus, Player } from "./typings";

export const GameController: FC<{
  classes: ClassNameMap;
  player1: Player;
  player2: Player;
  status: GameStatus;
  addScore: (playerName: string) => void;
}> = ({ classes, player1, player2, status, addScore }) => {
  const randomScore = () => {
    const randomNumber = Math.floor(Math.random() * 100 + 1);
    randomNumber % 2 ? addScore(player1.name) : addScore(player2.name);
  };
  const gameEnd = status === "end";
  return (
    <Grid className={classes.addScore} item xs={12} md={12}>
      <Button
        variant="contained"
        color="primary"
        disabled={gameEnd}
        onClick={() => addScore(player1.name)}
      >{`${player1.name} scores`}</Button>
      <Button
        disabled={gameEnd}
        variant="contained"
        onClick={() => randomScore()}
      >{`Random scores`}</Button>
      <Button
        variant="contained"
        color="secondary"
        disabled={gameEnd}
        onClick={() => addScore(player2.name)}
      >{`${player2.name} scores`}</Button>
    </Grid>
  );
};
