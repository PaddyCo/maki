import * as React from "react";

import BEMHelper from "../BEMHelper";

const classes = new BEMHelper("game-video");

export interface IProps {
  videoPath: string;
  muted?: boolean;
}

export interface IState {
  canPlay: boolean;
}

export default class GameVideo extends React.Component<IProps, IState> {

  public state: IState = {
    canPlay: false,
  };

  private video: HTMLVideoElement | null;
  private setCanPlayFunc: () => void;

  public componentDidMount() {
    if (!this.video) {
      console.warn("Video element not present on GameVideo, couldn't add event listener.")
      return;
    }

    this.setCanPlayFunc = this.setCanPlay.bind(this);

    this.video.addEventListener("canplay", this.setCanPlayFunc);
  }

  public componentWillUnmount() {
    if (this.video) {
      this.video.removeEventListener("canplay", this.setCanPlayFunc);
    }
  }

  public render() {
    const { videoPath, muted } = this.props;

    return (
      <div {...classes("", { playing: this.state.canPlay })}>
        <video
          {...classes("video-player")}
          src={`${videoPath}#t=1`}
          autoPlay
          loop
          ref={(element) => this.video = element}
          muted={muted}
        />
      </div>
    );
  }

  private setCanPlay() {
    this.setState({ canPlay: true });
    if (this.video) {
      this.video.volume = 0.2;
    }
  }
};
