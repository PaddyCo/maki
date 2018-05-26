import * as React from "react";

import BEMHelper from "../BEMHelper";
import { IGameEntry } from "../types";
import fixPath from "../helpers/fixPath";

const classes = new BEMHelper("game-carousel");

export interface IProps {
  entries: IGameEntry[];
}

export default class GameCarousel extends React.Component<IProps> {

  public render() {
    const { entries } = this.props;

    const width = window.innerWidth;
    const entryWidth = (width / (entries.length - 3.75));

    return (
      <div {...classes()}>
        {entries.map((e, i) => {
          const active = i === Math.floor(entries.length / 2);

          return (
            <div
              key={`${e.id}`}
              {...classes("slide", { active })}
              style={{
                width: `${entryWidth}px`,
                transform: `translate(${(i-1.875) * entryWidth}px)`
              }}
            >
              <div {...classes("inner-slide", { active })}>
                { e.clearLogoImagePath
                  ? <div
                      {...classes("image")}
                      style={{ backgroundImage: `url(${fixPath(e.clearLogoImagePath)})` }}
                    />
                  : <h1 {...classes("title")}>{e.title}</h1> }
                <div className={...classes("shine", { active })["className"]} />
                <div className={...classes("shine", { active, small: true })["className"]} />
              </div>
            </div>
          )
        })}
      </div>
    );
  }


}
