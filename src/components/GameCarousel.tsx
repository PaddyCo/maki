import * as React from "react";
import Slider from "react-slick";

import BEMHelper from "../BEMHelper";

const classes = new BEMHelper("game-carousel");

export interface IEntry {
  id: string;
  cloneIndex?: number;
  logoPath?: string;
  title: string;
}

export interface IProps {
  entries: IEntry[];
  isFocused: boolean;
  onGameChange?: (id: string) => void;
}

export default class GameCarousel extends React.Component<IProps> {

  private handleInputFunc: (event: KeyboardEvent) => void;
  private slider?: Slider;

  public componentDidMount() {
    // Assign handleInput function to a variable so we can remove it on unmount.
    this.handleInputFunc = this.handleInput.bind(this);

    document.addEventListener("keydown", this.handleInputFunc);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleInputFunc);
  }

  public render() {
    const { entries, onGameChange, isFocused } = this.props;
    const paddedEntries = this.padEntries(entries);

    return (
      <Slider
        {...classes("", { unfocused: !isFocused })}
        centerMode
        speed={100}
        accessibility={false}
        arrows={false}
        slidesToShow={5}
        swipe={false}
        lazyLoad={"ondemand"}
        afterChange={(index) => (onGameChange ? onGameChange(paddedEntries[index].id) : null)}
        ref={(slider) => { this.slider = slider ? slider : undefined }}
        infinite
      >
        { paddedEntries.map((e) => (
          <div {...classes("slide")} key={`${e.id}${e.cloneIndex}`}>
            <div {...classes("inner-slide")}>
              { e.logoPath ? <img {...classes("image")} src={e.logoPath} /> : <h1 {...classes("title")}>{e.title}</h1> }
              <div className={...classes("shine")["className"]} />
              <div className={...classes("shine", "small")["className"]} />
            </div>
          </div>
        ))}
      </Slider>
    );
  }

  private handleInput(event: KeyboardEvent) {
    if (!this.props.isFocused) { return; }
    if (!this.slider) { return; }

    switch (event.key) {
      case "ArrowLeft":
        this.slider.slickPrev();
        break;
      case "ArrowRight":
        this.slider.slickNext();
        break;
    }
  }

  // Slick Slider freaks out if there are lower amount of slides than slidesToShow,
  // so pad it out with clones if there are fewer than 5 entries.
  private padEntries(entries: IEntry[]) {
    const paddedEntries = entries.slice();
    let cloneIndex = 1;
    while (paddedEntries.length < 6) {
      const cloneEntries = entries.map((e) => Object.assign({}, e, { cloneIndex }));
      cloneIndex++;
      paddedEntries.push(...cloneEntries);
    }

    return paddedEntries;
  }
}
