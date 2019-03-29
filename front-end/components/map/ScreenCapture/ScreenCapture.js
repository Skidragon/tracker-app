import React, {Component, Fragment} from "react";
import html2canvas from "html2canvas";

export default class ScreenCapture extends Component {
  static defaultProps = {
    onStartCapture: () => null,
    onEndCapture: () => null,
  };
  constructor(props) {
    super(props);
    this.state = {
      on: true,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      crossHairsTop: 0,
      crossHairsLeft: 0,
      isMouseDown: false,
      windowWidth: 0,
      windowHeight: 0,
      borderWidth: 0,
      cropPositionTop: 0,
      cropPositionLeft: 0,
      cropWidth: 0,
      cropHeigth: 0,
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
      borderWidth: 0,
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
      borderWidth,
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
        <div className={`overlay`} style={{borderWidth}}>
          <div
            className="capture-region"
            style={{
              left: crossHairsLeft + "px",
              top: crossHairsTop + "px",
              width: captureWidth + "px",
              height: captureHeight + "px",
            }}
          />
        </div>
        <div
          className="crosshairs"
          style={{left: crossHairsLeft + "px", top: crossHairsTop + "px"}}
        />
      </div>
    );
  }
}
