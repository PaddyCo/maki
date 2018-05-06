import * as React from "react";
import { storiesOf } from "@storybook/react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import LoadingDialog from "../src/components/LoadingDialog";
import Overlay from "../src/components/Overlay";
import { Status } from "../src/types";

const OverlayDecorator = (storyFn: () => any) => (
  <Overlay>
    { storyFn() }
  </Overlay>
);

storiesOf("LoadingDialog", module)
  .addDecorator(OverlayDecorator)
  .add("No response", () =>
    <LoadingDialog status={undefined} apiProgress={0} />
  )
  .add("Waiting for API", () =>
    <LoadingDialog status={Status.Caching} apiProgress={0.75} />
  )
  .add("All done", () =>
    <LoadingDialog status={Status.Ok} apiProgress={1} />
  );

