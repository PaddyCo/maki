import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import MakiApiProvider from "./MakiApiProvider";
import { IInformation } from "./types";

const statusQuery = gql`
  query {
    information {
      status
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
        <StatusQuery query={statusQuery}>
          {({ loading, data }) => (
            <div>
              <h2>Maki!!!</h2>
              <p>{ data && !loading ? data.information.status : null }</p>
            </div>
          )}
        </StatusQuery>
      </MakiApiProvider>
    );
  }
}

