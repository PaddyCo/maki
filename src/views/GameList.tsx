import * as React from "react";
import * as moment from "moment";
import { ApolloClient } from "apollo-client":
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import Marquee from "react-smooth-marquee";
import { Key } from "ts-keycode-enum";

import { IGameEntry } from "../types";
import GameCarousel from "../components/GameCarousel";
import GameLogo from "../components/GameLogo";
import GameVideo from "../components/GameVideo";
import InfoTable from "../components/InfoTable";
import Background from "../components/Background";
import toSentence from "../helpers/toSentence";
import { Grid, Row, Column } from "../components/Grid";
import { IGame } from "../types";
import fixPath from "../helpers/fixPath";
import InputHandler, { Button } from "../helpers/InputHandler";

export interface IProps {
  games: IGameEntry[];
  client: ApolloClient<any>;
}

interface IState {
  currentGameIndex: number;
  lastRepeatTimestamp?: number;
  loadGame: boolean;
}

const GAMES_IN_WHEEL = 9;

const gameQuery = gql`
  query($gameId: String!) {
    game(id: $gameId) {
      id
      title
      developers
      publishers
      releaseDate
      genres
      playModes
      region
      platform
      notes
      clearLogoImagePath
      backgroundImagePath
      videoPath
    }
  }
`;
interface IGameData {
  game: IGame;
}
interface IGameProps {
  gameId: string;
}
class GameQuery extends Query<IGameData, IGameProps> {}

class GameList extends React.Component<IProps, IState> {
  public state: IState = {
    currentGameIndex: 607,
    loadGame: true,
  };
  private loadTimeoutId: NodeJS.Timer;
  private inputHandler: InputHandler;
  private lastScrollTimestamp: number;

  public componentDidMount() {
    // Assign handleInput function to a variable so we can remove it on unmount.
    this.inputHandler = new InputHandler(() => {
      if (this.shouldScroll("Left")) {
        this.scrollGames(-1);
      }
      if (this.shouldScroll("Right")) {
        this.scrollGames(1);
      }
    });
    this.inputHandler.bindKey("Left", Key.LeftArrow);
    this.inputHandler.bindKey("Right", Key.RightArrow);
    this.inputHandler.bindButton("Left", Button.Left);
    this.inputHandler.bindButton("Right", Button.Right);
  }

  public componentWillUnmount() {
    //this.inputHandler.destroy();
  }

  private rotateArray<T>(arr: T[], n: number): T[] {
    const offset = (n + arr.length) % arr.length;
    return arr.slice(offset).concat(arr.slice(0, offset));
  }

  public render() {
    const games = this.rotateArray<IGameEntry>(this.props.games, this.state.currentGameIndex - Math.floor(GAMES_IN_WHEEL / 2));
    const currentGame = games[Math.ceil(GAMES_IN_WHEEL / 2)-1];
    const { loadGame } = this.state;

    return (
      <GameQuery skip={!this.state.loadGame} query={gameQuery} variables={{ gameId: currentGame.id }}>
        {({ data, loading }) => (
          <Grid>
            <Background imageUrl={!loading && data ? fixPath(data.game.backgroundImagePath) : undefined} />
            <Row>
              <Column noGutter>
                <Row noGutter flex={2}>
                  <Column>
                    <GameLogo
                      key={currentGame.id}
                      title={currentGame.title}
                      developers={currentGame.developers || currentGame.publishers}
                      releaseYear={moment(currentGame.releaseDate).year().toString()}
                      logoPath={currentGame.clearLogoImagePath}
                    />
                  </Column>
                </Row>
                <Row noGutter>
                  <Column style={{ justifyContent: "flex-end" }}>
                    { data && loadGame && !loading
                      ? <InfoTable
                        key={currentGame.id}
                        title={currentGame.title}
                        data={this.getInfoData(!loading && data ? data.game : undefined)}
                      /> : null
                    }
                  </Column>
                </Row>
              </Column>
              <Column flex={1.5}>
                { !loading && loadGame && data && data.game && data.game.videoPath
                  ? <GameVideo key={currentGame.id} videoPath={`D:\\Dropbox\\LaunchBox\\${fixPath(data.game.videoPath)}`} />
                  : <div />
                }
              </Column>
            </Row>
            <Row noGutter flex="none" style={{ height: 80, marginBottom: 32 }}>
              <Column noGutter>
                <Marquee key={currentGame.id}>{!loading && loadGame && data && data.game ? data.game.notes : ""}</Marquee>
              </Column>
            </Row>
            <Row noGutter flex="none" style={{ height: "9vw" }}>
              <GameCarousel
                entries={games.slice(0, GAMES_IN_WHEEL)}
              />
            </Row>
          </Grid>
        )}
      </GameQuery>
    );
  }

  private getInfoData(game?: IGame): [string, string][] {
    const data: [string, string][] = [];

    if (game) {
      const playModes = game.playModes
                            .map((m) => m.match(/(\d*)-Player (.*)/i))
                            .map((m) => m ? `${m[1]} (${m[2]})` : "");

      if (playModes) {
        data.push(["Players", toSentence(playModes)]);
      }
    }

    data.push(
      ["Genre", game ? toSentence(game.genres) : ""],
      ["Region", game ? game.region : ""],
      ["Platform", game ? game.platform : ""],
    );

    return data;
  }

  private handleInput() {
    if (this.lastScrollTimestamp < performance.now() - 240) {
      if (this.inputHandler.isPressed("Left")) {
        this.scrollGames(-1);
      }

      if (this.inputHandler.isPressed("Right")) {
        this.scrollGames(1);
      }
    }

    if (this.inputHandler.isPressed("Launch")) {
      this.props.client.mutate({
        mutation: gql`
          mutation playGame($gameId: String!) {
            playGame(id: $gameId) {
              id
              playCount
            }
          }
        `,
        variables: { gameId: this.props.games[this.state.currentGameIndex].id },
      });
    }

    //if (event.repeat) {
    //  const lastRepeatTimestamp = this.state.lastRepeatTimestamp;
    //  if (!lastRepeatTimestamp || lastRepeatTimestamp + 80 < event.timeStamp) {
    //    this.setState({
    //      lastRepeatTimestamp: event.timeStamp;
    //    });
    //  } else {
    //    return;
    //  }
    //}

    //switch (event.key) {
    //  case "ArrowLeft":
    //    this.scrollGames(-1);
    //    break;
    //  case "ArrowRight":
    //    this.scrollGames(1);
    //    break;
    //  case "Enter":
    //    break;
    //}
  }

  private scrollGames(amount: number) {
    clearTimeout(this.loadTimeoutId);
    this.setState({
      currentGameIndex: this.state.currentGameIndex + amount,
      loadGame: false,
    }, () => {
      this.lastScrollTimestamp = performance.now();
      this.loadTimeoutId = setTimeout(() => {
        this.setState({ loadGame: true });
      }, 200);
    });
  }

  private shouldScroll(direction: "Left" | "Right"): boolean {
    const heldTime = this.inputHandler.held(direction);
    if (this.inputHandler.justPressed(direction)) {
      return true;
    } else if (heldTime && heldTime > 500 && performance.now() - this.lastScrollTimestamp > Math.max(150 - (heldTime / 80), 35)) {
      return true;
    }

    return false;
  }
}

export default withApollo(GameList);
