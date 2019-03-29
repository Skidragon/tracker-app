import {useEffect, useState} from "react";
import CrossHairs from "./CrossHairs";
import Overlay from "./Overlay";
import CaptureRegion from "./CaptureRegion";

const ScreenCapture = ({children, captureWidth, captureHeight}) => {
  const [on, setOn] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [crossHairs, setCrossHairs] = useState({
    top: 0,
    left: 0,
  });

  const [imageURL, setImageURL] = useState("");
  const ESCAPE_KEY = 27;

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleWindowResize = () => {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    setWindowSize({
      width: windowWidth,
      height: windowHeight,
    });
  };

  const handleStartCapture = () => setOn(true);

  const handleMouseMove = e => {
    setCrossHairs({
      top: e.clientY,
      left: e.clientX,
    });
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };
  const handleMouseUp = () => {
    setOn(false);
    setIsMouseDown(false);
  };

  const renderChild = () => {
    const props = {
      onStartCapture: handleStartCapture,
    };
    if (typeof children === "function") return children(props);
    return children;
  };

  if (!on) {
    return renderChild();
  } else {
    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {renderChild()}
        <Overlay>
          <CaptureRegion
            left={crossHairs.left}
            top={crossHairs.top}
            height={captureHeight}
            width={captureWidth}
          />
        </Overlay>
        <CrossHairs left={crossHairs.left} top={crossHairs.top} />
      </div>
    );
  }
};

export default ScreenCapture;
