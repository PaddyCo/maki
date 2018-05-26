import * as React from "react";

import BEMHelper from "../BEMHelper";

const classes = new BEMHelper("info-table");

export interface IProps {
  title?: string;
  data: [string, string][];
}

const InfoTable = ({ title, data }: IProps) => (
  <div {...classes()}>
    { title ? <div {...classes("title")}>{title}</div> : null }
    <div {...classes("rows")}>
      {
        data.map(([key, value]) =>
          <div key={key} {...classes("row")}>
            <span {...classes("key")}>{key}</span>
            <span {...classes("value")}>{value}</span>
          </div>
        )
      }
    </div>
  </div>
);

export default InfoTable;
