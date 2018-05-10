import * as React from "react";
import { storiesOf } from "@storybook/react";

import InfoTable from "../src/components/InfoTable";

const CenterDecorator = (storyFn: () => any) => (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <div style={{ width: 620 }}>
      { storyFn() }
    </div>
  </div>
);

const data: [string, string][] = [
  ["Genre", "Metroidvania"],
  ["Players", "2"],
  ["Region", "World"],
  ["Platform", "PC"],
  ["Game Jam", "SA GameDev VI"],
];

storiesOf("InfoTable", module)
  .addDecorator(CenterDecorator)
  .add("Basic table with title", () =>
    <InfoTable
      title={"Mountain of Debt"}
      data={data}
    />
  )
  .add("Basic table without title", () =>
    <InfoTable
      data={data}
    />
  );
