import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";


import GameCarousel from "../src/components/GameCarousel";

const CenterDecorator = (storyFn: () => any) => (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <div style={{ height: 128, width: "100%" }}>
      { storyFn() }
    </div>
  </div>
);

const entries = [
  {
    id: "mountain-of-debt",
    logoPath: "/logo.png",
    title: "Mountain of Debt",
  },
  {
    id: "duck-hunted",
    title: "Duck Hunted",
  },
  {
    id: "ballpuppys-big-adventure",
    logoPath: "/logo2.png",
    title: "Ballpuppy's Big Adventure",
  },
  {
    id: "unfinished-game",
    title: "Unfinished game",
  },
  {
    id: "another-game",
    title: "Another game",
  },
  {
    id: "6-game",
    title: "A sixth game!",
  },
  {
    id: "too-many-games",
    title: "Too many games!",
  },
  {
    id: "not-a-game",
    title: "Can't belive it's not a game!",
  }
];

storiesOf("GameCarousel", module)
  .addDecorator(CenterDecorator)
  .add("Carousel with 8 games", () =>
    <GameCarousel
      onGameChange={action("onGameChange")}
      isFocused={true}
      entries={entries}
    />
  )
  .add("Unfocused carousel with 8 games", () =>
    <GameCarousel
      onGameChange={action("onGameChange")}
      isFocused={false}
      entries={entries}
    />
  )

  .add("Carousel with 3 games", () =>
    <GameCarousel
      onGameChange={action("onGameChange")}
      isFocused={true}
      entries={entries.slice(0, 3)}
    />
  )
  .add("Carousel with 1 game", () =>
    <GameCarousel
      onGameChange={action("onGameChange")}
      isFocused={true}
      entries={entries.slice(0, 1)}
    />
  );
