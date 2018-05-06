import * as React from "react";

import Row from "./LoadingDialogRow";
import BEMHelper from "../BEMHelper";
import { Status } from "../types";

const classes = new BEMHelper("loading-dialog");

export interface IProps {
  status?: Status;
  apiProgress: number;
}

const LoadingDialog = ({ status, apiProgress }: IProps) => (
  <div className={`${classes()["className"]} animated fadeInUp`}>
    <Row
      label="Waiting for LaunchBox"
      active={!status}
      progress={!status ? 0 : 1}
    />
    <Row
      label="Waiting for Maki API"
      active={status === Status.Caching}
      progress={apiProgress}
    />
    <Row
      label="Ready to launch!"
      active={status === Status.Ok}
      progress={status === Status.Ok ? 1 : 0}
    />
  </div>
);

export default LoadingDialog;
