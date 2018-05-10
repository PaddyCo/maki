import * as React from "react";
import { storiesOf } from "@storybook/react";

import Marquee from "react-smooth-marquee";

const CenterDecorator = (storyFn: () => any) => (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    { storyFn() }
  </div>
);

storiesOf("Marquee", module)
  .addDecorator(CenterDecorator)
  .add("Marquee", () =>
    <Marquee>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at felis in sem convallis dignissim.
      Suspendisse in est sapien. Sed in nisl efficitur, hendrerit urna et, sollicitudin risus.
      Fusce sem sem, cursus in turpis eget, faucibus lacinia nunc. Praesent ipsum massa,
      ullamcorper eget lacus quis, dictum sodales nulla. Praesent faucibus vulputate risus,
      sit amet consequat nibh rhoncus vitae. Fusce in nulla non dui vestibulum tincidunt. Pellentesque
      eleifend tortor ac mi sodales egestas.
    </Marquee>
  );
