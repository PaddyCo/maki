import * as React from "react";
import { storiesOf } from "@storybook/react";

import { Grid, Row, Column } from "../src/components/Grid";

const testContent = (text: string) => (
  <div style={{
      backgroundColor: "rgba(0,0,0,0.5)",
      width: "100%",
      height: "100%",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
  }}>
    <h1 style={{ textAlign: "center" }}>{text}</h1>
  </div>
);

storiesOf("Grid", module)
  .add("1x1 grid", () =>
    <Grid>
      <Row>
        <Column>
          {testContent("1")}
        </Column>
      </Row>
    </Grid>
  )
  .add("2x2 grid", () =>
    <Grid>
      <Row>
        <Column>{testContent("1")}</Column>
        <Column>{testContent("2")}</Column>
      </Row>
      <Row>
        <Column>{testContent("3")}</Column>
        <Column>{testContent("4")}</Column>
      </Row>
    </Grid>
  )
  .add("Test grid", () =>
    <Grid>
      <Row>
        <Column noGutter>
          <Row noGutter flex={2}>
            <Column>{testContent("Logo")}</Column>
          </Row>
          <Row noGutter>
            <Column>{testContent("Info")}</Column>
          </Row>
        </Column>
        <Column flex={1.5}>{testContent("Video")}</Column>
      </Row>
      <Row noGutter flex="none" style={{ height: 96, marginBottom: 32 }}>
        <Column noGutter>{testContent("Marquee (Fixed height)")}</Column>
      </Row>
      <Row noGutter flex={0.3}>
        <Column noGutter>{testContent("Carousel")}</Column>
      </Row>
    </Grid>
  );
