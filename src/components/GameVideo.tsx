import * as React from "react";

import BEMHelper from "../BEMHelper";

const classes = new BEMHelper("game-video");

export interface IProps {
  videoPath: string;
  muted?: boolean;
}

const GameVideo = ({ videoPath, muted }: IProps) => (
  <div {...classes()}>
    <video
      {...classes("video-player")}
      src={videoPath}
      autoPlay
      loop
      muted={muted}
    />
  </div>
);

export default GameVideo;
