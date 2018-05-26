import * as React from "react";
import * as BEMHelper from "react-bem-helper";

const classes = BEMHelper({
  name: "background",
  prefix: "maki-",
});

export interface IProps {
  imageUrl?: string;
}

export interface IState {
  loaded: boolean;
}

export default class Background extends React.Component<IProps, IState> {

  private image: HTMLImageElement;
  private imageLoadedFunc: () => void;

  public state: IState = {
    loaded: false;
  };

  public constructor(props: IProps) {
    super(props);
    this.imageLoadedFunc = this.setLoaded.bind(this);
    this.image = new Image();
    this.image.addEventListener("load", this.imageLoadedFunc);
  }

  public componentWillReceiveProps(newProps: IProps) {
    if (newProps.imageUrl != this.props.imageUrl && newProps.imageUrl) {
      this.setState({ loaded: false });
      this.image.src = newProps.imageUrl;
    }
  }

  public componentWillUnmount() {
    if (this.image) {
      this.image.removeEventListener("load", this.imageLoadedFunc);
    }
  }

  public render() {
    const { imageUrl } = this.props;
    const { loaded } = this.state;

    return loaded ? (
      <div
        {...classes()}
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
      />
    ) : null;
  }

  private setLoaded() {
    this.setState({ loaded: true });
  }
}
