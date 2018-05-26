import * as React from "react";

import BEMHelper from "../BEMHelper";
import toSentence from "../helpers/toSentence";

const classes = new BEMHelper("game-logo");

export interface IProps {
  logoPath?: string;
  title: string;
  developers?: string[];
  releaseYear?: string;
}

const GameLogo = ({ title, logoPath, developers, releaseYear }: IProps) => (
  <div {...classes()}>
    { logoPath ? <img className={classes("image")["className"]} src={logoPath} /> : <h1 {...classes("title")}>{title}</h1> }
    <p {...classes("byline")}>
      {developers && developers.length > 0 ? toSentence(developers) : "Unknown"} · {releaseYear ? releaseYear : "Unknown"}
    </p>
  </div>
);

export default GameLogo;
