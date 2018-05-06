import * as React from "react";

import InitializeIconLibrary from "../src/icons";

InitializeIconLibrary();

// tslint:disable-next-line
require("../src/style/app.scss");

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import Overlay from "../src/components/Overlay";

storiesOf("Overlay", module)
  .add("With text", () =>
    <Overlay>
      <h1 style={{ color: "white" }}>Hello world!</h1>
    </Overlay>
  );
