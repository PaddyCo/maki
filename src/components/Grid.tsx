import * as React from "react";

import BEMHelper from "../BEMHelper";

const classes = new BEMHelper("grid");

export interface IGridProps {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  style?: React.CSSProperties;
}

export interface IProps extends IGridProps {
  flex?: number | string;
  noGutter?: boolean;
}

export const Grid = ({ children, style, className = "" }: IProps) => (
  <div className={`${classes()["className"]} ${className}`} style={style}>
    {children}
  </div>
);

export const Row = ({ children, style, className = "", noGutter = false, flex = 1 }: IProps) => (
  <div
    className={`${classes("row", { "no-gutter": noGutter })["className"]} ${className}`}
    style={{ flex, ...style }}>
    {children}
  </div>
);

export const Column = ({ children, style, className = "", noGutter = false, flex = 1 }: IProps) => (
  <div
    className={`${classes("column", { "no-gutter": noGutter })["className"]} ${className}`}
    style={{ flex, ...style }}
  >
    {children}
  </div>
);

