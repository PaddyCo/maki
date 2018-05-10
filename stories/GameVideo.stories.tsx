import * as React from "react";
import { storiesOf } from "@storybook/react";

import GameVideo from "../src/components/GameVideo";

const CenterDecorator = (storyFn: () => any) => (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <div style={{ width: "50%", height: "50%", border: "1px dashed rgba(0, 0, 0, 0.25)" }}>
      { storyFn() }
    </div>
  </div>
);

storiesOf("GameVideo", module)
  .addDecorator(CenterDecorator)
  .add("1:1 Gameplay video (Audio)", () =>
    <GameVideo
      videoPath={"/video.mp4"}
      muted={false}
    />
  )
  .add("1:1 Gameplay video (Muted)", () =>
    <GameVideo
      videoPath={"/video.mp4"}
      muted={true}
    />
  )
  .add("4:3 test video", () =>
    <GameVideo
      videoPath={"/4-3.mp4"}
      muted={true}
    />
  )
  .add("16:9 test video", () =>
    <GameVideo
      videoPath={"/16-9.mp4"}
      muted={true}
    />
  )
  .add("16:10 test video", () =>
    <GameVideo
      videoPath={"/16-10.mp4"}
      muted={true}
    />
  )
  .add("3:4 test video", () =>
    <GameVideo
      videoPath={"/3-4.mp4"}
      muted={true}
    />
  )
  .add("9:16 test video", () =>
    <GameVideo
      videoPath={"/9-16.mp4"}
      muted={true}
    />
  )









