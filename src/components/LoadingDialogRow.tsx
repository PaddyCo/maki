import * as React from "react";
import * as FontAwesomeIcon from "react-fontawesome";
import CircularProgressbar from "react-circular-progressbar";

import BEMHelper from "../BEMHelper";

const classes = new BEMHelper("loading-dialog-row");

export interface IProps {
  label: string;
  active: boolean;
  progress: number;
}

const LoadingDialogRow = ({ label, active, progress }: IProps) => (
  <div {...classes("", { inactive: !active })}>
    { progress >= 1
      ? <div className={`${classes("icon", "success")["className"]} animated bounceIn`}>
          <FontAwesomeIcon name="check" />
        </div>
      : <CircularProgressbar
          {...classes("progress-bar")}
          percentage={progress * 100}
        />
    }
    <div className={`${classes("label", { inactive: !active })["className"]} ${ active ? "animated pulse" : null}`}>
      { label }
    </div>
  </div>
);

export default LoadingDialogRow;
