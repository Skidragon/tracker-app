import React, {Component, Fragment} from "react";
import CrossHairs from "./CrossHairs";
import Overlay from "./Overlay";
import CaptureRegion from "./CaptureRegion";

export default class ScreenCapture extends Component {
  static defaultProps = {
    onStartCapture: () => null,
    onEndCapture: () => null,
  };
  constructor(props) {
    super(props);
    this.state = {
      on: true,
      crossHairsTop: 0,
      crossHairsLeft: 0,
      isMouseDown: false,
      windowWidth: 0,
      windowHeight: 0,
      imageURL: "",
    };
    this.ESCAPE_KEY = 27;
  }

  componentDidMount = () => {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleWindowResize);
  };

  handleWindowResize = () => {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    this.setState({
      windowWidth,
      windowHeight,
    });
  };

  handStartCapture = () => this.setState({on: true});

  handleMouseMove = e => {
    this.setState({
      crossHairsTop: e.clientY,
      crossHairsLeft: e.clientX,
    });
  };

  handleMouseDown = e => {
    if (e.keyCode === this.ESCAPE_KEY) {
      this.setState({
        on: false,
        isMouseDown: false,
      });
    }
    this.setState(prevState => ({
      isMouseDown: true,
    }));
  };

  handleMouseUp = e => {
    this.setState({
      on: false,
      isMouseDown: false,
    });
  };

  renderChild = () => {
    const {children} = this.props;

    const props = {
      onStartCapture: this.handStartCapture,
    };

    if (typeof children === "function") return children(props);
    return children;
  };

  render() {
    const {
      on,
      crossHairsTop,
      crossHairsLeft,
      isMouseDown,
      imageURL,
    } = this.state;
    const {captureWidth, captureHeight} = this.props;
    if (!on) return this.renderChild();

    return (
      <div
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {this.renderChild()}
        <Overlay>
          <CaptureRegion
            left={crossHairsLeft}
            top={crossHairsTop}
            height={captureHeight}
            width={captureWidth}
          />
        </Overlay>
        <CrossHairs left={crossHairsLeft} top={crossHairsTop} />
      </div>
    );
  }
}
