import {useEffect, useState, MouseEvent, ReactNode} from "react";
import "./screen.less";
import {mapImageUrlGenerator} from "../helper-functions";

interface Props {
  lat: number;
  lng: number;
  captureWidth: string;
  captureHeight: string;
  isScreenOn: boolean;
}

const ScreenCapture: React.SFC<Props> = ({
  lat,
  lng,
  captureWidth,
  isScreenOn,
  captureHeight,
}) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [crossHairs, setCrossHairs] = useState({
    top: 0,
    left: 0,
  });

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
  const handleMouseMove = (e: MouseEvent) => {
    setCrossHairs({
      top: e.clientY,
      left: e.clientX,
    });
  };

  const handleMouseUp = () => {};
  if (isScreenOn) {
    return (
      <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <div className={`overlay`} />
        <div
          className="crosshairs"
          style={{
            left: crossHairs.left + "px",
            top: crossHairs.top + "px",
          }}
        />
        <div
          className="capture-region"
          style={{
            left: crossHairs.left + "px",
            top: crossHairs.top + "px",
            width: captureWidth + "px",
            height: captureHeight + "px",
          }}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default ScreenCapture;
