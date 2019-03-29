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
    const {
      isMouseDown,
      windowWidth,
      windowHeight,
      startX,
      startY,
      borderWidth,
    } = this.state;

    let cropPositionTop = startY;
    let cropPositionLeft = startX;
    const endX = e.clientX;
    const endY = e.clientY;
    const isStartTop = endY >= startY;
    const isStartBottom = endY <= startY;
    const isStartLeft = endX >= startX;
    const isStartRight = endX <= startX;
    const isStartTopLeft = isStartTop && isStartLeft;
    const isStartTopRight = isStartTop && isStartRight;
    const isStartBottomLeft = isStartBottom && isStartLeft;
    const isStartBottomRight = isStartBottom && isStartRight;
    let newBorderWidth = borderWidth;
    let cropWidth = 0;
    let cropHeigth = 0;

    if (isMouseDown) {
      if (isStartTopLeft) {
        newBorderWidth = `${startY}px ${windowWidth -
          endX}px ${windowHeight - endY}px ${startX}px`;
        cropWidth = endX - startX;
        cropHeigth = endY - startY;
      }

      if (isStartTopRight) {
        newBorderWidth = `${startY}px ${windowWidth -
          startX}px ${windowHeight - endY}px ${endX}px`;
        cropWidth = startX - endX;
        cropHeigth = endY - startY;
        cropPositionLeft = endX;
      }

      if (isStartBottomLeft) {
        newBorderWidth = `${endY}px ${windowWidth -
          endX}px ${windowHeight - startY}px ${startX}px`;
        cropWidth = endX - startX;
        cropHeigth = startY - endY;
        cropPositionTop = endY;
      }

      if (isStartBottomRight) {
        newBorderWidth = `${endY}px ${windowWidth -
          startX}px ${windowHeight - startY}px ${endX}px`;
        cropWidth = startX - endX;
        cropHeigth = startY - endY;
        cropPositionLeft = endX;
        cropPositionTop = endY;
      }
    }

    this.setState({
      crossHairsTop: e.clientY,
      crossHairsLeft: e.clientX,
      borderWidth: newBorderWidth,
      cropWidth,
      cropHeigth,
      cropPositionTop: cropPositionTop,
      cropPositionLeft: cropPositionLeft,
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
