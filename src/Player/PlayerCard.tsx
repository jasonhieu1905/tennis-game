import { Grid, ListItem, ListItemText, Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { FC } from "react";
import { GameStatus, Player, ScoreSteps } from "../Game/typings";
import SportsTennisIcon from "@material-ui/icons/SportsTennis";

export const PlayerCard: FC<{
  classes: ClassNameMap;
  player: Player;
  status: GameStatus;
  isPrimaryColor?: boolean;
}> = ({ classes, player, status: gameStatus, isPrimaryColor }) => {
  return (
    <>
      <Grid className={classes.player} item xs={6} md={6}>
        <Typography variant="h6" className={classes.title}>
          {player.name}
          <SportsTennisIcon
            style={{ marginLeft: "10px" }}
            color={isPrimaryColor ? "primary" : "secondary"}
          />
        </Typography>
        {gameStatus === "score" && (
          <PlayerDisplayInfo classes={classes} score={player.score} />
        )}
        {gameStatus === "advantage" && player.score === "Advantage" && (
          <PlayerDisplayInfo classes={classes} score={player.score} />
        )}
      </Grid>
    </>
  );
};

const PlayerDisplayInfo: FC<{
  classes: ClassNameMap;
  score: ScoreSteps;
}> = ({ classes, score }) => (
  <ListItem className={classes.score}>
    <ListItemText primary={score} />
  </ListItem>
);
