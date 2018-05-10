import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { CSSTransition } from "react-transition-group";

import MakiApiProvider from "./MakiApiProvider";
import { IInformation } from "./types";
import LoadingDialog from "./components/LoadingDialog";
import Overlay from "./components/Overlay";
import InitializeIconLibrary from "./icons";
import { Status } from "../src/types";

InitializeIconLibrary();

const statusQuery = gql`
  query {
    information {
      status
      cacheProgress
    }
  }
`;
interface IStatusData {
  information: IInformation;
}
class StatusQuery extends Query<IStatusData, null> {}

export class App extends React.Component<null, null> {
  render() {
    return (
      <MakiApiProvider>
        <div>
          <StatusQuery
            query={statusQuery}
            notifyOnNetworkStatusChange={true}
          >
            {({ data, startPolling, error }) => {
              if (error) {
                data = undefined;
              }
              const ready = data && data.information && data.information.status == Status.Ok;

              startPolling(ready ? 5000 : 500);

              return (
                <div>
                  <CSSTransition
                    in={!ready}
                    unmountOnExit={true}
                    timeout={{
                      enter: 1000,
                      exit: 1000,
                    }}
                    classNames={{
                      appear: "animated fadeIn",
                      enter: "animated fadeIn",
                      exit: "animated fadeOut",
                    }}
                  >
                    <Overlay>
                      <LoadingDialog
                        status={data && data.information ? data.information.status : undefined}
                        apiProgress={data && data.information ? data.information.cacheProgress : 0}
                      />
                    </Overlay>
                  </CSSTransition>
                  <CSSTransition
                    in={ready}
                    unmountOnExit={true}
                    timeout={{
                      enter: 1000,
                      exit: 1000,
                    }}
                    classNames={{
                      enter: "animated fadeInDown",
                      exit: "animated fadeOutUp",
                    }}
                  >
                    <h2>Maki!!</h2>
                  </CSSTransition>
                </div>
              );
            }}
          </StatusQuery>
        </div>
      </MakiApiProvider>
    );
  }
}
