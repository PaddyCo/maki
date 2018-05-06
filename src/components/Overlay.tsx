import * as React from "react";
import * as BEMHelper from "react-bem-helper";

const classes = BEMHelper({
  name: "overlay",
  prefix: "maki-",
});

export interface IProps {
  children: JSX.Element;
  className?: string;
}

const Overlay = ({ children }: IProps) => (
  <div {...classes()}>
    {children}
  </div>
);

export default Overlay;

