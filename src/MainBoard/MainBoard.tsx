import { Container, Grid } from "@material-ui/core";
import { TENNIS_GAME_KEY } from "../constants";
import GameBoard from "../Game/GameBoard";
import { GameProvider } from "../Game/GameProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import Registration from "../Registration/Registration";

function MainBoard() {
  const [gameState, setGameState] = useLocalStorage(TENNIS_GAME_KEY);

  const gameBoard = (
    <GameProvider gameState={gameState}>
      <GameBoard />
    </GameProvider>
  );
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={1}
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        style={{marginTop: '30px', backgroundColor: '#f5f5f5'}}
      >
        {gameState ? gameBoard : <Registration onRegisterSubmit={setGameState} />}
      </Grid>
    </Container>
  );
}

export default MainBoard;
