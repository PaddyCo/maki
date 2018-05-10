import * as React from "react";

import BEMHelper from "../BEMHelper";

const classes = new BEMHelper("game-logo");

export interface IProps {
  logoPath?: string;
  title: string;
  developers: string[];
  releaseYear?: string;
}

const toSentence = (developers: string[]) => (
  developers.length <= 1 ? developers[0] : developers.slice(0, developers.length - 1).join(", ") + " & " + developers.slice(-1)
);

const GameLogo = ({ title, logoPath, developers, releaseYear }: IProps) => (
  <div {...classes()}>
    { logoPath ? <img {...classes("image")} src={logoPath} /> : <h1 {...classes("title")}>{title}</h1> }
    <p {...classes("byline")}>{developers.length > 0 ? toSentence(developers) : "Unknown"} · {releaseYear ? releaseYear : "Unknown"}</p>
  </div>
);

export default GameLogo;
