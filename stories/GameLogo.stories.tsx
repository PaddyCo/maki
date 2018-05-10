import * as React from "react";
import { storiesOf } from "@storybook/react";

import GameLogo from "../src/components/GameLogo";

const CenterDecorator = (storyFn: () => any) => (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <div style={{ width: 512 }}>
      { storyFn() }
    </div>
  </div>
);

storiesOf("GameLogo", module)
  .addDecorator(CenterDecorator)
  .add("Basic game", () =>
    <GameLogo
      title={"Mountain of Debt"}
      logoPath={"/logo.png"}
      developers={["Cool Devs"]}
      releaseYear={"2011"}
    />
  )
  .add("Multiple developers", () =>
    <GameLogo
      title={"Mountain of Debt"}
      logoPath={"/logo.png"}
      developers={["Svampson", "CBoyardee", "FrankieSmileShow"]}
      releaseYear={"2011"}
    />
  )
  .add("No developers", () =>
    <GameLogo
      title={"Mountain of Debt"}
      logoPath={"/logo.png"}
      developers={[]}
      releaseYear={"2011"}
    />
  )
  .add("No year", () =>
    <GameLogo
      title={"Mountain of Debt"}
      logoPath={"/logo.png"}
      developers={["Cool Devs"]}
      releaseYear={undefined}
    />
  )
  .add("No image", () =>
    <GameLogo
      title={"Mountain of Debt"}
      logoPath={undefined}
      developers={["Cool Devs"]}
      releaseYear={"2011"}
    />
  );
