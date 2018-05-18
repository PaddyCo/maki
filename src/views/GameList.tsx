import * as React from "react";

import { IGameEntry } from "../types";
import GameCarousel from "../components/GameCarousel";

export interface IProps {
  games: IGameEntry[];
}

export interface IState {
  currentGameId: string;
}

export default class GameList extends React.Component<IProps, IState> {

  public state: IState = {
    currentGameId: this.props.games[0].id,
  };

  public render() {
    const { games } = this.props;
    return (
      <GameCarousel
        isFocused
        entries={games.slice(0, 100)}
      />
    );
  }
}
