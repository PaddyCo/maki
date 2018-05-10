declare module "react-smooth-marquee" {
  import * as React from "react";
  interface IProps {
    velocity?: number;
  }
  declare class Marquee extends React.Component<IProps>{}
  export default Marquee;
}
